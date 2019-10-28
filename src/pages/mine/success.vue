<template>
  <div class="qytscontent">
    <div class="iconimg">
      <img src="../../assets/img/successIcon.png">
    </div>
    <p class="tip_text">{{tipText}}</p>
    <div class="timer">{{second}}s后自动关闭</div>
  </div>
</template>

<script>
  export default {
    props: ['ableClose', 'tipText'],
    name: 'success',
    data () {
      return {
        second: 3
      }
    },
    mounted () {
      this.timer()
    },
    methods: {
      /**
       * 验证码倒计时
       */
      timer () {
        let promise = new Promise((resolve, reject) => {
          let setTimer = setInterval(
            () => {
              let second = this.second - 1
              this.second = second
              if (this.second <= 0) {
                this.second = 3
                resolve(setTimer)
                this.close()
              }
            }, 1000)
        })
        promise.then((setTimer) => {
          clearInterval(setTimer)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .qytscontent {
    text-align: center;
    margin: 0 auto;
    position: relative;

    p {
      font-size: 35px;
      font-weight: bold;
      padding: 40px 0 20px 0;
      position: relative;
    }

    img {
      width: 120px;
      height: 120px;
    }
  }

  .iconimg {
    margin-top: -100px;
    z-index: 1;
    left: 0;
    text-align: center;
    position: absolute;
    width: 100%;
  }

  .timer {
    color: #A3A3A3;
  }
</style>
