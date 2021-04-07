This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Deploy with Apache2 ###
1. Install Apache in your server. Rename the file "example.immo_belgium.conf" to "immo_belgium.conf", edit it and add to /etc/apache2/sites-available
2. Allow Apache settings for backend application proxy:   
  - `a2enmod proxy`
  - `a2enmod proxy_http`
  - `a2enmod proxy_ajp`
  - `a2enmod proxy_balancer`
  - `a2enmod proxy_connect`
  - `a2enmod proxy_html`   
3. Deactivate default file `a2dissite 000-default.conf`   
4. Activate file `a2ensite immo_belgium.conf`.
5. Check config file `apache2ctl configtest`.
6. Apply apache2: `sudo a2enmod rewrite && sudo systemctl restart apache2`. 
7. For logs `nano /var/log/apache2/error.log`.
