<template>
    <div>
        <div class="list" v-for="(item,index) in shopList" :key="index">
            <h2>{{item.name}}</h2>
            <p @click="toTBsearch(index)">{{item.det}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            shopList:[
                {name:'钥匙',det:'思考思考对话框的快递'},
                {name:'马斯',det:'2很多活动开始考虑考'},
                {name:'车子',det:'思考看到空间框的快递'},
                {name:'房子',det:'思考思考电风扇士大夫'},
                {name:'苹果',det:'思考思考对话框的快递'},
                {name:'电视',det:'思考思考对话框的快递'},
            ]
        }
    },
    methods:{
        toTBsearch(ind){
            console.log(this.shopList[ind].name)
            debugger
            let alUrl = this.urls.CHECK_GOODS_DET + this.shopList[ind].name;
            this.$http(alUrl).then(res=>{
                console.log(res)
            }).catch(reson=>{
                console.log(reson);
            })
        }
    },
    
}
</script>
<style scoped>
.list {
    display:flex;
    justify-content: space-around;
}
h2 {
    color: yellowgreen;
}
p {
    text-decoration-line: underline;
    color: gray;
    font-size: 14px;
}
</style>