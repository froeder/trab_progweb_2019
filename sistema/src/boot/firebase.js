// import firebase from 'firebase/auth'

// const config = {
//   apiKey: "AIzaSyAJd5pyVQpbRl0lJHyaiGpAUNHbT2f6FpM",
//   authDomain: "atosufms.firebaseapp.com",
//   databaseURL: "https://atosufms.firebaseio.com",
//   projectId: "atosufms",
//   storageBucket: "atosufms.appspot.com",
//   messagingSenderId: "360651549460",
//   appId: "1:360651549460:web:6201f6f3697b9158"
// }
// firebase.initializeApp(config) ;

// export default async ({  app, router, store, Vue  }) => {
//   Vue.use(VueFire)
//   Vue.prototype.$firebase = firebase

//   firebase.auth().onAuthStateChanged(user => {
//    // Any logic you might want run when the user state changes
//   })

//   // router.beforeEach((to, from, next) => {
//   //   let currentUser = firebase.auth().currentUser
//   //   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   //   console.log('to', to, 'from', from)
//   //   if (requiresAuth && !currentUser && to.path !== '/login') {
//   //     console.log('Needs to be logged in .. redirecting to login')
//   //     next('login')
//   //   }
//   //   next()
//   // })
// }

import * as firebase from 'firebase' ;
import {LocalStorage} from 'quasar' ;

const config = {
  apiKey: "AIzaSyAJd5pyVQpbRl0lJHyaiGpAUNHbT2f6FpM",
  authDomain: "atosufms.firebaseapp.com",
  databaseURL: "https://atosufms.firebaseio.com",
  projectId: "atosufms",
  storageBucket: "atosufms.appspot.com",
  messagingSenderId: "360651549460",
  appId: "1:360651549460:web:6201f6f3697b9158"
}

export const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ Vue, router }) => {
  Vue.prototype.$auth = AUTH

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('USER') ;
      console.log(user) ;
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

  router.beforeEach((to, from, next)=>{
    const currentUser = LocalStorage.getItem('user_logado')// import firebase from 'firebase/auth'

    // const config = {
    //   apiKey: "AIzaSyAJd5pyVQpbRl0lJHyaiGpAUNHbT2f6FpM",
    //   authDomain: "atosufms.firebaseapp.com",
    //   databaseURL: "https://atosufms.firebaseio.com",
    //   projectId: "atosufms",
    //   storageBucket: "atosufms.appspot.com",
    //   messagingSenderId: "360651549460",
    //   appId: "1:360651549460:web:6201f6f3697b9158"
    // }
    // firebase.initializeApp(config) ;

    // export default async ({  app, router, store, Vue  }) => {
    //   Vue.use(VueFire)
    //   Vue.prototype.$firebase = firebase

    //   firebase.auth().onAuthStateChanged(user => {
    //    // Any logic you might want run when the user state changes
    //   })

    //   // router.beforeEach((to, from, next) => {
    //   //   let currentUser = firebase.auth().currentUser
    //   //   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    //   //   console.log('to', to, 'from', from)
    //   //   if (requiresAuth && !currentUser && to.path !== '/login') {
    //   //     console.log('Needs to be logged in .. redirecting to login')
    //   //     next('login')
    //   //   }
    //   //   next()
    //   // })
    // }


    const requiresAuth = to.matched.some(record => record.meta.requiresAuth) ;
    const landdingPage = to.matched.some(record => record.meta.landdingPage) ;
    if(requiresAuth && !currentUser) next('/login/login') ;
    else if(!requiresAuth && currentUser) next('home') ;
    else if(landdingPage) next('/landding-page') ;
    else next() ;
  })
}
