export default async function auth({ next, router }) {
  if (!localStorage.getItem("token")) router.push({ name: "AdminLogin" });
  return next();
}
