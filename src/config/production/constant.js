module.exports = {
  STAGE: {
    COMPLETED: {
      STAGE_NAME: 'COMPLETED',
    },
    PRODUCT: {
      STAGE_NAME: 'PRODUCT',
      en: {
        HEADING: 'Ready to sell? let’s add your products first!',
        CONTENT: 'Add products into Sellsuki inventory to run your online store.',
      },
      th: {
        HEADING: 'มาเริ่มสร้างสินค้าชิ้นแรก บนร้านค้าของคุณกัน!',
        CONTENT: 'เพิ่มสินค้าในระบบ Sellsuki เพื่อเริ่มการขายบนร้านค้าของคุณ', 
      }
    },
    SHIPPING: {
      STAGE_NAME: 'SHIPPING',
      en: {
        HEADING: 'Have you added payment methods?',
        CONTENT: 'Provide your payment methods for money receiving.',
      },
      th: {
        HEADING: 'สร้างวิธีจัดส่งสินค้าตอนนี้ เพื่อเริ่มการขายบนร้านค้าของคุณ!',
        CONTENT: 'เพิ่มวิธีจัดส่งสินค้าพร้อมค่าจัดส่ง ให้ลูกค้าของคุณมีทางเลือกในการรับของ', 
      }
    },
    PAYMENT: {
      STAGE_NAME: 'PAYMENT',
      en: {
        HEADING: 'Do not forget adding delivery options.',
        CONTENT: 'More delivery options, more customer satisfaction..',
      },
      th: {
        HEADING: 'ดูเหมือนว่าร้านค้าของคุณยังไม่มีช่องทางการชำระเงินนะ!',
        CONTENT: 'เพิ่มช่องทางชำระเงิน ช่วยให้ลูกค้าชำระเงินค่าสินค้าได้อย่างง่ายดาย', 
      }
    }
  },
  ONESIGNAL: {
    APP_ID: '17056444-a80b-40d4-9388-1a9a751b0f31',
    REST_API: 'Basic ZjhhZjViNjYtYmUwZS00Zjg0LTk3NmQtYzQ1ZmM4ZDVhOGI2',
    CONTENT_TYPE: 'application/json; charset=utf-8',
    HOST: 'onesignal.com',
    PATH: '/api/v1/notifications',
    PORT: 443
  },
  FIRESTORE: {
    API_KEY: 'AIzaSyCWJOdnyasNUL7xAWi83WDHihsKj92N7R8',
    AUTH_DOMIN: 'notification-7e499.firebaseapp.com',
    DATABASE_URL: 'https://notification-7e499.firebaseio.com',
    PROJECT_ID: 'notification-7e499',
    STORAGE_BUCKET: 'notification-7e499.appspot.com',
    MESSAGING_SENDER_ID: '400202276323'
  },
  SERVER: {
    SELLSUKI_URL: 'http://192.168.1.254:8003/store/get-store-notification?store_ids[]='
  }
}