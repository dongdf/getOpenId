<template>
    <mt-popup v-model="pickerShow" position="bottom" class="mint-popup-3" :modal="true">
        <div class="picker_c">
            <!--<mt-picker :slots="myAddressSlots" :showToolbar="true"  value-key="name"   @change="onMyAddressChange">-->
                <!--<h3><span @click="cancle" class="cancle">取消</span>请选择地区<span @click="ok" class="ok">确定</span></h3>-->
             <!--</mt-picker>-->
            <mt-picker :slots="numberSlot" @change="onNumberChange"  :showToolbar="true"  value-key="classfyName">
                <h3><span @click="cancle" class="cancle">取消</span>请选择<span @click="ok" class="ok">确定</span></h3>
            </mt-picker>

        </div>
    </mt-popup>

</template>

<script>
  import { Picker } from 'mint-ui'
  export default {
    name: "picker",
    components: {
      'mt-picker': Picker
    },
    props:['pickerShow','pickerList'],
    data () {
      return {
        numberSlot: [{
          flex: 1,
          defaultIndex: 0,
          values: this.pickerList,
          className: 'slot1'
        }],
        myselectitem:{}
      }
    },
    created() {


    },
    methods: {
      ok(){
        let that = this;
        var postdata = {
          selectItem:this.myselectitem
        }
        this.$emit('itemok',postdata);
      },
      cancle(){
        this.$emit('itemcancle')
      },

      onNumberChange(picker, values) {
        this.number = values[0];
        this.myselectitem = values[0];
      }
    },
    mounted(){
      // this.$nextTick(() => {
      //   let step = 0;
      //     setInterval(() => {
      //       this.numberSlot[0].defaultIndex = step++;
      //     if (step > this.numberSlot[0].values.length - 1) {
      //       step = 0;
      //     }
      //   }, 1000);
      //   });
    }
  }
</script>

<style scoped>
    .mint-popup-3 {width:100%; height:100%; background: none;}
    .picker_c{width:100%; background:#FFF;
        position: fixed; bottom:0;}

    .picker-toolbar h3 {border-bottom:1px solid  #EEE;
        padding:10px;height:1rem;
        position: relative; text-align: center;
        font-weight: normal;}
    .ok {
        position: absolute; color:#C9A063;  top:15px; right:10px;}
    .cancle {
        position: absolute;color:#C9A063;  top:15px;left:10px;}
</style>