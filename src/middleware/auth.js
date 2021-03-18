export default async function auth({ next, router }) {
    
    if (!localStorage.getItem('code') || (Math.round(+new Date() / 1000) - localStorage.getItem('logDate')) > 80000) {
      return router.push({ name: 'Login' });
    }

    return next();
  }