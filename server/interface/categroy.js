import Router from 'koa-router';
import axios from './utils/axios'
import Categroy from '../dbs/models/categroy'

let router = new Router({
  prefix: '/categroy'
})

const sign = 'abcd';

router.get('/crumbs', async (ctx) => {

  let result = await Categroy.findOne({
    city: ctx.query.city.replace('市', '') || '北京'
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }

  // let {
  //   status,
  //   data: {
  //     areas,
  //     types
  //   }
  // } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
  //   params: {
  //     city: ctx.query.city.replace('市', '') || "北京",
  //   }
  // })
  // ctx.body = {
  //   areas: status === 200 ? areas : [],
  //   types: status === 200 ? types : []
  // }
})


router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router;