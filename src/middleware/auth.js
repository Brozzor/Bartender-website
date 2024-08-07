export default async function auth({ next, router }) {
    if (!localStorage.getItem('password') || (new Date().getTime() - parseInt(localStorage.getItem('loginDate'))) > (18 * 60 * 60 * 1000)) {
     return await next({ name: 'Login' });
    }

    return next();
  }