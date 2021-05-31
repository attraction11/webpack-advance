/*
  socket.io 自定义通信事件名
 */
module.exports = {
  EVENT_DEAL_DEALT: 'EVENT_DEAL_DEALT', // 成交明细
  EVENT_REQUEST_QUOTE: 'EVENT_REQUEST_QUOTE', // 报价信息
  EVENT_REQREJ_QUOTE: 'EVENT_REQREJ_QUOTE', // 返回报价被所有对手方拒绝的信息
  EVENT_UNDO_QUOTE: 'EVENT_UNDO_QUOTE', // 返回撤销报价信息
  EVENT_ORDER_RFQ: 'EVENT_ORDER_RFQ', // 返回是否成交
  EVENT_REQREJ_ORDERUNDO: 'EVENT_REQREJ_ORDERUNDO', // 接收订单状态
  EVENT_CHANGE_ER: 'EVENT_CHANGE_ER' // 接收累计成交量、订单量、订单状态、历史成交信息
}
