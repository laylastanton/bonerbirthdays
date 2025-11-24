# Vercel Deployment Guide

This guide walks you through deploying the B1 Dashboard to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com) - free tier works great)
- Completed Supabase setup with data migrated

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, make sure all your code is committed to a Git repository:

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - B1 Dashboard"
```

### 2. Push to GitHub

Create a new repository on GitHub, then:

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/b1-dashboard.git

# Push your code
git branch -M main
git push -u origin main
```

### 3. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your `b1-dashboard` repository from GitHub
5. Vercel will automatically detect it as a SvelteKit project

### 4. Configure Build Settings

Vercel should auto-detect the following (verify these are correct):

- **Framework Preset**: SvelteKit
- **Build Command**: `npm run build`
- **Output Directory**: `.svelte-kit` (auto-detected)
- **Install Command**: `npm install --force`

If you need to set the install command manually, add it in the build settings.

### 5. Add Environment Variables

Before deploying, add your Supabase credentials:

1. In the Vercel project configuration, find "Environment Variables"
2. Add the following variables:

   | Name | Value |
   |------|-------|
   | `PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) |
   | `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

3. Make sure these are set for all environments (Production, Preview, Development)

### 6. Deploy

1. Click "Deploy"
2. Vercel will:
   - Clone your repository
   - Install dependencies
   - Build your SvelteKit app
   - Deploy it to their global CDN

3. Wait for the deployment to complete (usually 1-2 minutes)

### 7. Access Your Live Site

Once deployment is complete, you'll get a live URL like:
- `https://b1-dashboard.vercel.app`
- Or a custom domain if you configure one

## Automatic Deployments

After initial setup, Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets its own preview URL

## Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain (e.g., `b1.yourdomain.com`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificates

## Troubleshooting

### Build Fails

**Error**: `npm install` fails

**Solution**: Make sure the install command uses `--force` flag:
```
npm install --force
```

### Environment Variables Not Working

**Error**: Can't connect to Supabase

**Solution**: 
1. Verify environment variables are set correctly
2. Make sure variable names start with `PUBLIC_` (required for SvelteKit)
3. Redeploy after adding/changing variables

### Database Connection Issues

**Error**: 404 or 401 from Supabase

**Solution**:
1. Check Supabase project is active
2. Verify Row Level Security policies in `supabase-schema.sql`
3. Confirm anon key has proper permissions

## Updating Your Deployment

To deploy changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically detect the push and deploy your changes.

## Monitoring

Vercel provides:

- **Analytics**: Visit your project dashboard to see traffic
- **Logs**: View function logs for debugging
- **Performance**: Monitor Core Web Vitals

## Best Practices

1. **Test Locally First**: Always run `npm run build` and `npm run preview` before pushing
2. **Use Preview Deployments**: Test changes in preview URLs before merging to main
3. **Monitor Logs**: Check function logs if you encounter issues in production
4. **Set up Alerts**: Configure Vercel integrations for deployment notifications

## Costs

The free tier includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- Serverless functions

This should be more than sufficient for a community dashboard.

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- SvelteKit Adapter: [@sveltejs/adapter-vercel](https://kit.svelte.dev/docs/adapter-vercel)

