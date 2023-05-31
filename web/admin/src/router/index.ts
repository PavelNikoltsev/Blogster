import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import base from '@/pages/base.vue'

function route(path: string, filePath: string, children: RouteRecordRaw[] = []) {
  let component: any = () => {
    try {
      return import(`../pages/${filePath}`)
    } catch {
      console.error(`Can't find page ${filePath} for route ${path}`)
      return base
    }
  }
  if (!filePath) {
    component = base
  }
  return {
    path,
    component,
    children
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    route('/', 'index.vue'),
    route('/sign-in', 'sign-in.vue'),
    route('/sign-up', 'sign-up.vue'),
    route('/profile', 'profile.vue'),
    route('/settings', '', [
      route('', 'settings/index.vue'),
      route('cron-jobs', '', [
        route('', 'settings/cron-jobs/index.vue'),
        route(':id', '', [
          route('', 'settings/cron-jobs/cron-job.vue'),
          route('logs', '', [
            route('', 'settings/cron-jobs/logs/index.vue'),
            route(':log_id', 'settings/cron-jobs/logs/log.vue')
          ])
        ])
      ]),
      route('logs', '', [
        route('', 'settings/logs/index.vue'),
        route(':log_id', 'settings/logs/log.vue')
      ])
    ]),
    route('/users', '', [route('', 'users/index.vue'), route(':id', 'users/user.vue')]),
    route('/categories', '', [
      route('', 'categories/index.vue'),
      route(':id', 'categories/user.vue')
    ]),
    route('/comments', '', [route('', 'comments/index.vue'), route(':id', 'comments/user.vue')]),
    route('/pages', '', [route('', 'pages/index.vue'), route(':id', 'pages/user.vue')]),
    route('/posts', '', [route('', 'posts/index.vue'), route(':id', 'posts/user.vue')]),
    route('/tags', '', [route('', 'tags/index.vue'), route(':id', 'tags/user.vue')])
  ]
})

export default router
