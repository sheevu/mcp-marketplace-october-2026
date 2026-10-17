-- ====================================================================
-- SUDARSHAN MCP HUB - PRODUCTION POSTGRESQL SCHEMA WITH RLS
-- ====================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Profiles (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    company_name TEXT,
    role TEXT NOT NULL DEFAULT 'developer' CHECK (role IN ('developer', 'enterprise', 'admin', 'moderator')),
    phone_number TEXT,
    city TEXT,
    country TEXT DEFAULT 'India',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 3. Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    gstin TEXT,
    pan TEXT,
    billing_email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. Organization Members (Multi-tenancy RBAC)
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'billing', 'member')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(organization_id, user_id)
);

-- 5. Publishers
CREATE TABLE IF NOT EXISTS public.publishers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('official', 'community', 'sudarshan')),
    verified BOOLEAN NOT NULL DEFAULT false,
    website_url TEXT,
    contact_email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 6. Categories
CREATE TABLE IF NOT EXISTS public.mcp_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    display_order INT DEFAULT 0
);

-- 7. MCP Servers
CREATE TABLE IF NOT EXISTS public.mcp_servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    publisher_id UUID NOT NULL REFERENCES public.publishers(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.mcp_categories(id) ON DELETE RESTRICT,
    transport TEXT NOT NULL DEFAULT 'stdio' CHECK (transport IN ('stdio', 'sse', 'websocket', 'stream')),
    runtime TEXT NOT NULL DEFAULT 'node' CHECK (runtime IN ('node', 'python', 'docker', 'remote-sse')),
    package_command TEXT NOT NULL,
    package_args JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_trending BOOLEAN NOT NULL DEFAULT false,
    is_indian_business_suite BOOLEAN NOT NULL DEFAULT false,
    pricing_type TEXT NOT NULL DEFAULT 'free' CHECK (pricing_type IN ('free', 'paid', 'freemium')),
    price_inr NUMERIC(10, 2) DEFAULT 0.00,
    github_url TEXT,
    documentation_url TEXT,
    security_notice TEXT,
    required_permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 8. MCP Server Versions
CREATE TABLE IF NOT EXISTS public.mcp_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    release_notes TEXT,
    package_args JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(mcp_server_id, version)
);

-- 9. MCP Tools
CREATE TABLE IF NOT EXISTS public.mcp_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    input_schema JSONB DEFAULT '{}'::jsonb,
    required_permissions JSONB DEFAULT '[]'::jsonb,
    UNIQUE(mcp_server_id, name)
);

-- 10. Client Compatibility Matrix
CREATE TABLE IF NOT EXISTS public.client_compatibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL CHECK (client_name IN ('cursor', 'claude-desktop', 'vscode', 'claude-code', 'codex-cli', 'chatgpt', 'windsurf')),
    is_supported BOOLEAN NOT NULL DEFAULT true,
    tested_version TEXT,
    instructions_override TEXT,
    UNIQUE(mcp_server_id, client_name)
);

-- 11. Saved Servers (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(user_id, mcp_server_id)
);

-- 12. Installation Records (Telemetry / User Installed Logs)
CREATE TABLE IF NOT EXISTS public.installation_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    client TEXT NOT NULL,
    os TEXT NOT NULL,
    installed_version TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 13. Installation Templates
CREATE TABLE IF NOT EXISTS public.installation_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    client TEXT NOT NULL,
    template_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 14. Pricing Plans
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price_inr NUMERIC(10, 2) NOT NULL,
    interval TEXT NOT NULL CHECK (interval IN ('month', 'year', 'one-time')),
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    razorpay_plan_id TEXT
);

-- 15. Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    razorpay_order_id TEXT NOT NULL UNIQUE,
    amount_inr NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'attempted', 'paid', 'failed')),
    receipt TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 16. Payments
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    razorpay_payment_id TEXT NOT NULL UNIQUE,
    razorpay_signature TEXT NOT NULL,
    amount_inr NUMERIC(10, 2) NOT NULL,
    payment_method TEXT,
    status TEXT NOT NULL DEFAULT 'captured',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 17. Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.pricing_plans(id) ON DELETE RESTRICT,
    razorpay_subscription_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'completed')),
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 18. Entitlements
CREATE TABLE IF NOT EXISTS public.entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mcp_server_id UUID REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    feature_key TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 19. Custom MCP Requests
CREATE TABLE IF NOT EXISTS public.custom_mcp_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    business_industry TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    required_integration TEXT NOT NULL,
    target_apis JSONB NOT NULL DEFAULT '[]'::jsonb,
    desired_workflow TEXT NOT NULL,
    preferred_clients JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_budget_inr TEXT NOT NULL,
    target_delivery_date TEXT NOT NULL,
    detailed_requirements TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'qualifying', 'proposal_sent', 'approved', 'in_development', 'delivered', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 20. Custom MCP Projects
CREATE TABLE IF NOT EXISTS public.custom_mcp_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.custom_mcp_requests(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_development' CHECK (status IN ('draft', 'scoping', 'in_development', 'qa_testing', 'completed', 'delivered')),
    github_private_repo TEXT,
    quotation_inr NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 21. Project Milestones
CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.custom_mcp_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
    milestone_order INT NOT NULL DEFAULT 1
);

-- 22. Support Tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 23. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info',
    read BOOLEAN NOT NULL DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 24. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 25. Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(user_id, mcp_server_id)
);

-- 26. Security Reports
CREATE TABLE IF NOT EXISTS public.security_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mcp_server_id UUID NOT NULL REFERENCES public.mcp_servers(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    vulnerability_details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'investigating' CHECK (status IN ('investigating', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_mcp_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_mcp_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, public read for usernames
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- MCP Servers: Public read access for published servers
CREATE POLICY "Public read for published servers"
    ON public.mcp_servers FOR SELECT
    USING (status = 'published');

-- Saved Servers: Users manage their own bookmarks
CREATE POLICY "Users can read own saved servers"
    ON public.saved_servers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved servers"
    ON public.saved_servers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved servers"
    ON public.saved_servers FOR DELETE
    USING (auth.uid() = user_id);

-- Custom MCP Requests: Users see their own submissions
CREATE POLICY "Users view own requests"
    ON public.custom_mcp_requests FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users insert requests"
    ON public.custom_mcp_requests FOR INSERT
    WITH CHECK (true);

-- Orders & Payments: Users only see their own orders
CREATE POLICY "Users view own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id);

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_mcp_servers_slug ON public.mcp_servers(slug);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_category ON public.mcp_servers(category_id);
CREATE INDEX IF NOT EXISTS idx_mcp_servers_featured ON public.mcp_servers(is_featured);
CREATE INDEX IF NOT EXISTS idx_saved_servers_user ON public.saved_servers(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay ON public.orders(razorpay_order_id);
