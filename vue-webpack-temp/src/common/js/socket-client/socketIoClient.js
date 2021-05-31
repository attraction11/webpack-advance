const __instance = (() => {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  };
})();

class SocketIoClient {
  constructor(io, url, options = {}, keys) {
    if (!io || !url || !options) {
      throw new Error('[socket.io] needs connection params.');
    }

    if (__instance()) return __instance();

    this.socket = io(url, options);
    this.keys = keys;
    this.init();
    __instance(this);
  }

  init() {
    console.log(this.socket);
    this.socket.on('connect', () => {
      console.log(`socket connected. socket id = ${this.socket.id}`);
    });

    this.socket.on('connect_error', (error) => {
      console.log(`socket connect_error: ${error}. socket id = ${this.socket.id}.`);
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`socket reconnect: ${attemptNumber}. socket id = ${this.socket.id}.`);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`socket disconnect. socket id = ${this.socket.id}. reason { ${reason} }`);
    });
  }

  close() {
    this.socket.close();
  }

  // 接收成交数据
  receiveDealDealt(callback) {
    this.socket.on(this.keys.EVENT_DEAL_DEALT, callback);
  }

  // 报价请求数据
  receiveRequestQuote(callback) {
    this.socket.on(this.keys.EVENT_REQUEST_QUOTE, callback);
  }

  // 报价撤销
  receiveRequestQuoteUndo(callback) {
    this.socket.on(this.keys.EVENT_UNDO_QUOTE, callback);
  }

  // 报价请求被拒绝或者倒计时时间到
  receiveRequestRej(callback) {
    this.socket.on(this.keys.EVENT_REQREJ_QUOTE, callback);
  }

  // 是否成功成交
  receiveRequestOrder(callback) {
    this.socket.on(this.keys.EVENT_ORDER_RFQ, callback);
  }
  // 接收订单状态
  receiveOrderStatus(callback) {
    this.socket.on(this.keys.EVENT_REQREJ_ORDERUNDO, callback);
  }

  // 接收累计成交量、订单量、订单状态、历史成交信息
  receiveOrderOthers(callback) {
    this.socket.on(this.keys.EVENT_REQREJ_ORDERUNDO, callback);
  }
}

export default SocketIoClient;