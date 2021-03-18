export default function auth({ next, router }) {
    console.log("eee")
    if (!localStorage.getItem('code')) {
      return router.push({ name: 'Login' });
    }
  
    return next();
  }