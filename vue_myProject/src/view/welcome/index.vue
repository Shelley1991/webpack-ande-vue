<template>
    <div>
        <img/>
        <h2>欢迎选购storm科技产品</h2>
        <p @click="goShop">点击进入选购</p>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        goShop(){
            this.$router.push({path:'/shopList'})
        }
    }
}
</script>
<style scoped>
h2{
    color: dodgerblue;
}
p{
    text-decoration-line: underline;
    color: cyan;
    cursor: pointer;
}
</style>