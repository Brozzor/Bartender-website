export default async function auth({ next, router }) {
  if (!localStorage.getItem("token")) return router.push({ name: "AdminLogin" });
  return next();
}
