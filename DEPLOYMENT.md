# PolitíCat NM Deployment Checklist

## Current Hosting Model

Public site:

```text
GitHub Pages
Repository: MetaLex505/politicat-nm
Custom domain: politicatnm.org
```

Admin site:

```text
Cloudflare Access
Hostname: admin.politicatnm.org
Destination: Cloudflare Worker or other protected backend
```

## Repo-Side Custom Domain

The repo contains:

```text
CNAME -> politicatnm.org
```

That is correct for GitHub Pages serving the apex domain.

## Cloudflare DNS: Public Website

Create these records in Cloudflare DNS for `politicatnm.org`.

### Apex Domain

Add four `A` records:

```text
Type: A
Name: @
Value: 185.199.108.153
Proxy: DNS only or Proxied
```

```text
Type: A
Name: @
Value: 185.199.109.153
Proxy: DNS only or Proxied
```

```text
Type: A
Name: @
Value: 185.199.110.153
Proxy: DNS only or Proxied
```

```text
Type: A
Name: @
Value: 185.199.111.153
Proxy: DNS only or Proxied
```

### WWW

Add:

```text
Type: CNAME
Name: www
Target: metalex505.github.io
Proxy: DNS only or Proxied
```

## Cloudflare DNS: Admin

`admin.politicatnm.org` needs a DNS/destination record before Cloudflare Access can appear.

Recommended first destination:

```text
Cloudflare Worker: politicat-admin
Custom domain: admin.politicatnm.org
```

After the Worker exists, attach the custom domain from the Worker's domain/routes settings.

Expected result:

```text
https://admin.politicatnm.org/
  -> Cloudflare Access login
  -> protected admin page / Worker response
```

## PolitíCat .com

Use `politicatnm.com` as a redirect, not a separate website.

Recommended behavior:

```text
politicatnm.com -> https://politicatnm.org
www.politicatnm.com -> https://politicatnm.org
```

This can be handled with Cloudflare redirect rules after DNS exists.

## Verification Commands

From PowerShell:

```powershell
Resolve-DnsName politicatnm.org -Type A
Resolve-DnsName www.politicatnm.org -Type CNAME
Resolve-DnsName admin.politicatnm.org -Type CNAME
```

HTTP checks:

```powershell
Invoke-WebRequest https://politicatnm.org/ -UseBasicParsing
Invoke-WebRequest https://admin.politicatnm.org/ -UseBasicParsing
```

## Troubleshooting

If `admin.politicatnm.org` shows:

```text
DNS name does not exist
```

the problem is DNS, not the admin app.

If `admin.politicatnm.org` resolves but does not show Cloudflare Access, check:

- Worker custom domain is attached
- DNS is proxied through Cloudflare
- Cloudflare Access application hostname matches exactly
- Access policy allows the intended email
