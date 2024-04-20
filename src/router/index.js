import Barrage from '@/components/barrage.vue';
export default new VueRouter({
    routes: [

        // {
        //     path: '/home',
        //     name: 'home',
        //     component: Home
        // },
        {
            path: '/',
            name: 'index',
            component: Barrage
        },
        // {
        //     path: '/searchPageDetails',
        //     name: 'searchPageDetails',
        //     component: () => import( /* webpackChunkName: "about" */ './views/SearchPageDetails.vue')
        // }
        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})