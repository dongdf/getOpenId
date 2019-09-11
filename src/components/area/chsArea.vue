<template>
    <mt-popup v-model="pickerShow" position="bottom" class="mint-popup-3" :modal="true">
        <div class="picker_c">
            <mt-picker :slots="myAddressSlots" :showToolbar="true"  value-key="name"   @change="onMyAddressChange">

                    <h3><span @click="cancle" class="cancle">取消</span>请选择地区<span @click="ok" class="ok">确定</span></h3>

            </mt-picker>

        </div>
    </mt-popup>

</template>

<script>
  import { Picker } from 'mint-ui'
  import myaddress from './area.json'
  export default {
    name: "csharea",
    components: {
      'mt-picker': Picker
    },
    props:['pickerShow'],
    data () {
      return {
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values:Object.values(myaddress), //省份数组
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince:null,
        myAddressCity:null,
        myAddresscounty:null,
      }
    },
    created() {


    },
    methods: {
      ok(){
        let that = this;
        var postdata = {
          province:that.myAddressProvince,
          city:that.myAddressCity,
          county:that.myAddresscounty
        }
        this.$emit('areaok',postdata);
      },
      cancle(){
        this.$emit('areacancle')
      },
      onMyAddressChange(picker, values) {

        if(values[0]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          //省级
          picker.setSlotValues(1,values[0].children); // Object.keys()会返回一个数组，当前省的数组
          this.myAddressProvince = {
            name:values[0].name,
            code:values[0].code+'0000'
          };
          //市区
          if(values[1]) {
            picker.setSlotValues(2,values[1].children); // 区/县数据就是一个数组
            this.myAddressCity = {
              name:values[1].name,
              code:values[1].code+'00'
            };
            this.myAddresscounty = {
              name:'',
              code:'000000'
            };
          }
          //县区
          if(values[2]) {
            this.myAddresscounty = {
              name:values[2].name,
              code:values[2].code
            };

            // this.myAddresscounty = {
            //   name:'',
            //   code:''
            // };


          }
        }
      },
    },
    mounted(){
      // console.log(Object.values(myaddress));
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex =0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
    }
  }
</script>

<style lang="scss" scoped>

.mint-popup-3 {width:100%; height:100%; background: none;}
    .picker_c{width:100%; background:#FFF;
        position: fixed; bottom:0;}

    .picker-toolbar h3 {border-bottom:1px solid  #EEE;
          padding:20px;height:90px;
        position: relative; text-align: center;
        font-weight: normal;}
    .ok {
        position: absolute; color:#FF4A02; font-size:30px;font-weight: bold;  top:25px; right:30px;}
    .cancle {
        position: absolute;color:#666; font-size:30px; top:25px;left:30px;}
</style>
