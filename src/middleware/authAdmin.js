export default async function auth({ next, router }) {
  if (!localStorage.getItem("tokenSession")) {
    return router.push({ name: "AdminLogin" });
  }

  return next();
}
