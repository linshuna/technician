<template>
  <div class="mainContent"> 
		<div class="setMar" style="margin:0">
			<div class="" style="display: inline-block;border: 8px solid rgb(238, 238, 238);border-radius: 20px;width: 50%;padding: .4rem 0;margin: 1rem 0;">
				<div class="uploadDiv">
					<form id="uploadCarnoForm" class="setInputWidth" ref="form">
						<span class="setSaomaImg">
							<img :src="imgOpt_first">
						</span>
						<input type="file" name="file" accept="image/*" id="carnoPic" @change="picChange" ref="carPicInput">
					</form>
					
				</div>
				<p class="setFontPadding">立即识别(车牌)</p>
			</div>
			
			<div class="logoWrap" style="border: 8px solid rgb(238, 238, 238);border-radius: 20px;width: 50%;padding: .4rem 0;margin: 0 auto;" @click="manualImport">
				<p class="setLogoImg">
					<img :src="imgOpt_sec">
				</p>
				<p class="setFontPadding">手动输入</p>
			</div>
		</div>
	</div>
</template>
<script>
  import axios from 'axios'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        imgOpt_first: require('../modules/images/saoma.png'),
        imgOpt_sec: require('../modules/images/entryWrite.png'),
        uploadPic:''
      }
    },
    methods: {
      manualImport() {
        window.location.href='search.html'
      },
      picChange() {
        if(this.$refs.carPicInput.files.length!==0){
          var formData = new FormData(this.$refs.form)
          console.log(formData)

          let config = { 
            headers:{'Content-Type':'multipart/form-data'} 
          };
          axios.post('/api.php/TechMeet/uploadCarno',formData,config)
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              this.uploadPic = res.data.pic
              this.getLicensePlate(this.uploadPic)
            }else{
              Toast(res.message)
            }
          })
        }
      },
      getLicensePlate(pic) {
        this.$http.post('/api.php/apiOcr/getlicensePlate',{'pic':pic,'sign':'24cSGM7151LA'})
          .then((response)=>{
            let res = response.data
            if(res.errorCode == 200){
              console.log(res.data.number)
              window.location.href='search.html?carno='+res.data.number
            }else{
              Toast(res.message)
            }
          })
      }
    }
  }
</script>
<style scoped>
  .clear{
    overflow:hidden;
  }
  .uploadDiv{
    display: inline-block;
    width: 100%;
    height: 100%;
    
  }
  .uploadDiv input{
    display: inline-block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .setAbs{
    padding-top: .16rem;
      color: #333;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      left: 0;
  }
  .setFixed{
    position: fixed;
    bottom: .2rem;
    left: 50%;
    margin-left: -2rem;
    color: #999;
  }


  form {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
  }
  input[type='file'] {
      display: inline-block;
      width: 100%;
      height: 100%;
      opacity: 0;
      filter: alpha(opacity=0);
      position: absolute;
      z-index: 5;
      left: 0;
      top: 0;
  }
  .setImg{
    display: none;
      width: 1.83rem;
      height: 1.3rem;
      position: absolute;
      left: 0;
      /*margin: -0.27rem 0 0 -.66rem;*/
      top: 0;
      z-index: 3;
  }


  .setPosition{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1.3rem;
    margin-left: -0.9rem;
  }
  .setPosition .uploadWrap{
    border: none;
  }
  .setPosition input[type='file']{
    display: inline-block;
      width: .5rem;
      height: .5rem;
      opacity: 0;
      filter: alpha(opacity=0);
      position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .setFontPadding{
    padding-top: .2rem;
    color: rgba(30,30,30,0.80);
    font-family: PingFangSC-Regular;
    font-size: .32rem;
    letter-spacing: 0.75px;
  }
  .setLogoImg{
    text-align: center;	
  }
  .setOrImg{
    padding: .8rem 0;
  }
  .setOrImg img{
    display: inline-block;
    width: .88rem;
    height: .52rem;
  }
  .setSaomaImg img{
    display: inline-block;
    width: 2rem;
  }
  .setLogoImg img{
    display: inline-block;
    width: 2rem;
  }
  div.noBorder{
    width: 100%;
    border:none;
  }
  .showUploadImg{
    display: inline-block;
    width: .8rem;
  }
</style>