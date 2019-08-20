import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
// import afterEach from './afterEach'
import Auth from '@/pages/auth'
import NotFound from '@/components/404'
// import NotFound from '@/pages/hello'
//
//底部菜单
import Home from '@/pages/home'
import School from '@/pages/course'
import Question from '@/pages/question'
import Service from '@/pages/service'
import Mine from '@/pages/mine/mine'

// //全局页面
import Searchpage from '@/pages/search'
//
// //课程相关
import CourseList from '@/pages/course/list'
import CourseDetail from '@/pages/course/detail'
import LiveDetail from '@/pages/course/liveDetail'
//
// 问答相关
import QuestionList from '@/pages/question/list'
import QuestionDetail from '@/pages/question/detail'
import MyQuestionDetail from '@/pages/question/myDetail'
import AskQuestion from '@/pages/question/ask'
import AskMore from '@/pages/question/askMore'
import AnswerQuestion from '@/pages/question/answer'
//
//服务相关
import ServiceList from '@/pages/service/list'
import ServiceDetail from '@/pages/service/detail'
//
//专家相关
import Experts from '@/pages/experts'
import areaExperts from '@/pages/experts/areaIndex'
import ExpertsDetail from '@/pages/experts/detail'
import Consult from '@/pages/experts/consultmanage'
import Team from '@/pages/experts/teammanage'
import Chat from '@/pages/chat/chat'
//
// //知识相关
import Knowledge from '@/pages/knowledge'
import KnowledgeDetail from '@/pages/knowledge/detail'
import KnowledgeList from '@/pages/knowledge/list'
//
// //个人中心
import UserInfo from '@/pages/mine/userInfo'
import MyQuestion from '@/pages/mine/myquestion'
import MyConsulation from '@/pages/mine/myConsulation'
import MyCourse from '@/pages/mine/myCourse'
import MyKnowledge from '@/pages/mine/myKnowledge'
import MyFocus from '@/pages/mine/myFocus'
import Score from '@/pages/mine/score'
import Wallet from '@/pages/mine/wallet'
import Cash from '@/pages/mine/cash'
import Vip from '@/pages/mine/vip'
import Order from '@/pages/mine/order'
import Coupon from '@/pages/mine/coupon'
import Message from '@/pages/mine/message'
import ExpertInfo from '@/pages/mine/expertInfo'
import Myservice from '@/pages/mine/myService'
import guanzhu from '@/pages/mine/guanzhu'
import Wenda from '@/pages/mine/wenda'
//
// //经纪人相关
import AgentInfo from '@/pages/agent'
import Broker from '@/pages/agent/firstbroker'
import SecondBroker from '@/pages/agent/secondbroker'
import Sales from '@/pages/agent/salesperson'
import Invitationrecord from '@/pages/agent/invitationrecord'
import Member from '@/pages/agent/cards'
//
// //系统设置
import Settings from '@/pages/mine/settings'
import Advice from '@/pages/mine/advice'
//
// //登录完善
import Login from '@/pages/login'
import Compelete from '@/pages/login/compelete'
import Collection from '@/pages/collection'
import Apply from '@/pages/apply/apply.vue'
import Invitation from '@/pages/invitation/invitation'
import Agentmoney from '@/pages/experts/agentMoney'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          title: '财合税'
        }
      },
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: '财合税'
            }
        },
        {
            path: '/school',
            name: 'School',
            component: School,
            meta: {
                title: '学院'
            }
        },
        {
            path: '/service',
            name: 'Service',
            component: Service,
            meta: {
                title: '产品'
            }
        },
        {
            path: '/mine',
            name: 'Mine',
            component: Mine,
            meta: {
                title: '我的'
            }
        },
        {
            path: '/search',
            name: 'Search',
            component: Searchpage,
            meta: {
                title: '搜索'
            }
        },
        {
            path: '/coupon',
            name: 'Coupon',
            component: Coupon,
            meta: {
                title: '优惠券'
            }
        },
        {
            path: '/score',
            name: 'Score',
            component: Score,
            meta: {
                title: '我的积分'
            }
        },
        {
            path: '/wallet',
            name: 'Wallet',
            component: Wallet,
            meta: {
                title: '我的钱包'
            }
        },
        {
            path: '/cash',
            name: 'Cash',
            component: Cash,
            meta: {
                title: '提现'
            }
        },
        {
            path: '/vip',
            name: 'Vip',
            component: Vip,
            meta: {
                title: '会员卡'
            }
        },
        {
            path: '/my-question',
            name: 'MyQuestion',
            component: MyQuestion,
            meta: {
                title: '我的问答'
            }
        },
        {
            path: '/my-consulation',
            name: 'MyConsulation',
            component: MyConsulation,
            meta: {
                title: '我的咨询'
            }
        },
        {
            path: '/my-course',
            name: 'MyCourse',
            component: MyCourse,
            meta: {
                title: '我的课程'
            }
        },
      {
        path: '/my-guanzhu',
        name: 'guanzhu',
        component: guanzhu,
        meta: {
          title: '我的关注'
        }
      },

        {
            path: '/my-knowledge',
            name: 'MyKnowledge',
            component: MyKnowledge,
            meta: {
                title: '我的知识'
            }
        },
      {
        path: '/my-service',
        name: 'Myservice',
        component: Myservice,
        meta: {
          title: '我的订单'
        }
      },

        {
            path: '/my-focus',
            name: 'MyFocus',
            component: MyFocus,
            meta: {
                title: '我的关注'
            }
        },
        {
            path: '/message',
            name: 'Message',
            component: Message,
            meta: {
                title: '我的消息'
            }
        },
        {
            path: '/order',
            name: 'Order',
            component: Order,
            meta: {
                title: '我的订单'
            }
        },
        {
            path: '/member',
            name: 'Member',
            component: Member,
            meta: {
                title: '我的会员卡'
            }
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
                title: '设置'
            }
        },
        {
            path: '/advice',
            name: 'Advice',
            component: Advice,
            meta: {
                title: '建议'
            }
        },
        {
            path: '/user-info',
            name: 'UserInfo',
            component: UserInfo,
            meta: {
                title: '个人信息'
            }
        },
        {
            path: '/expert-info',
            name: 'ExpertInfo',
            component: ExpertInfo,
            meta: {
                title: '专家个人信息'
            }
        },
      {
        path: '/expert-wd',
        name: 'Wenda',
        component: Wenda,
        meta: {
          title: '问答审核'
        }
      },

        {
            path: '/team',
            name: 'Team',
            component: Team,
            meta: {
                title: '佣金收益'
            }
        },
        {
            path: '/consult',
            name: 'Consult',
            component: Consult,
            meta: {
                title: '咨询管理'
            }
        },
        {
            path: '/agent-info',
            name: 'Agentinfo',
            component: AgentInfo,
            meta: {
                title: '经纪个人信息'
            }
        },
        {
            path: '/broker',
            name: 'Broker',
            component: Broker,
            meta: {
                title: '经纪人团队管理'
            }
        },
        {
            path: '/second-broker',
            name: 'SecondBroker',
            component: SecondBroker,
            meta: {
                title: '二级经纪人团队管理'
            }
        },
        {
            path: '/sales',
            name: 'Sales',
            component: Sales,
            meta: {
                title: '销售员审核'
            }
        },
        {
            path: '/invition',
            name: 'Invitationrecord',
            component: Invitationrecord,
            meta: {
                title: '经纪人邀请记录'
            }
        },

        {
            path: '/service-detail',
            name: 'ServiceDetail',
            component: ServiceDetail,
            meta: {
                title: '服务详情'
            }
        },
        {
            path: '/service-list',
            name: 'ServiceList',
            component: ServiceList,
            meta: {
                title: '服务分类'
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '完善信息'
            }
        },
        {
            path: '/compelete',
            name: 'Compelete',
            component: Compelete,
            meta: {
                title: '完善信息'
            }
        },
        {
            path: '/question',
            name: 'Question',
            component: Question,
            meta: {
                title: '问答'
            }
        },
        {
            path: '/question-list',
            name: 'questionList',
            component: QuestionList,
            meta: {
                title: '问答列表'
            }
        },
        {
            path: '/question-detail',
            name: 'questionDetail',
            component: QuestionDetail,
            prop:true,
            meta: {
                title: '问答详情'
            }
        },
        {
            path: '/my-question-detail',
            name: 'MyQuestionDetail',
            component: MyQuestionDetail,
            meta: {
                title: '问答详情'
            }
        },
        {
            path: '/ask-question',
            name: 'AskQuestion',
            component: AskQuestion,
            meta: {
                title: '我要提问'
            }
        },
        {
            path: '/ask-more',
            name: 'AskMore',
            component: AskMore,
            meta: {
                title: '追问'
            }
        },
        {
            path: '/answer-question',
            name: 'AnswerQuestion',
            component: AnswerQuestion,
            meta: {
                title: '我要回答'
            }
        },
        {
            path: '/experts',
            name: 'Experts',
            component: Experts,
            meta: {
                title: '专家团'
            }
        },
      {
        path: '/areaExperts',
        name: 'areaExperts',
        component: areaExperts,
        meta: {
          title: '区域专家'
        }
      },
        {
            path: '/expert-detail',
            name: 'ExpertsDetail',
            component: ExpertsDetail,
            meta: {
                title: '专家详情'
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat,
            meta: {
                title: '聊天'
            }
        },

        {
            path: '/knowledge',
            name: 'Knowledge',
            component: Knowledge,
            meta: {
                title: '知识'
            }
        },
      {
        path: '/knowledge-list',
        name: 'KnowledgeList',
        component: KnowledgeList,
        meta: {
          title: '知识列表'
        }
      },
        {
            path: '/knowledge-detail',
            name: 'KnowledgeDetail',
            component: KnowledgeDetail,
            meta: {
                title: '知识详情'
            }
        },
        {
            path: '/course-list',
            name: 'CourseList',
            component: CourseList,
            prop:true,
            meta: {
                title: '课程列表'
            }
        },
        {
            path: '/course-detail',
            name: 'CourseDetail',
            component: CourseDetail,
            prop:true,
            meta: {
                title: '课程详情'
            }
        },
        {
            path: '/live-detail',
            name: 'LiveDetail',
            component: LiveDetail,
            prop:true,
            meta: {
                title: '直播详情'
            }
        },


        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
            meta: {
                title: '微信授权'
            }
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound,
            meta: {
                title: '404'
            },
        },
      {
        path: '/agentMoney',
        name: 'agentMoney',
        component:Agentmoney,
            meta: {
              title: '佣金'
            }
      },

       {
        path: '/collection',
        name: 'collection',
        component:Collection,
          meta: {
            title: '专家团'
          }
        },
        {
          path: '/apply',
            name: 'apply',
          component:Apply,
          meta: {
          title: '申请'
        }
        },
        {
          path: '/invitation',
            name: 'invitation',
            component:Invitation,
            meta: {
            title: '邀请'
          }
        }
    ]
})

router.beforeEach(beforeEach)
// router.afterEach(afterEach)
export default router
