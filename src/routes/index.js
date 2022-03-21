import { mount, route } from 'navi'
import Persona from '../pages/persona'

export default mount({
  '/': route({
    getView: () => import('../pages/index.js')
  }),
  '/persona/:id': route(req => {
    return {
      view: <Persona id={req.params.id} />,
    }
  })
})
