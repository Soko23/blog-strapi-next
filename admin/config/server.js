module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('ADMIN_URL', ),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1ddd2aa0687955431c18e42833de77fb'),
    },
  },
});
