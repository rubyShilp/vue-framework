<template>
<div>
    <div class="padding_from">
           <div class="padding_from_di">
               <div class="padding_from_di">
                    <vue-draggable-resizable parent=".padding_from" :w='823' :h='320'>
                        <div style="width: 800px; height: 300px;" ref="chart"></div>
                    </vue-draggable-resizable>   
                </div>
            </div>     
    </div>
    <button @click="userQuery()">123123</button>
    <div style="width: 800px; height: 300px;" ref="ddd"></div>
</div>
</template>
<script src="./login.js"></script>
