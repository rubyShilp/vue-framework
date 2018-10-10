<template>
<div class="center">
  hello Vue {{querySerch.name}}
  </br>
  <input type="text" v-model="querySerch.name"/>
  <button @click="login()"><i class="fa-icon-pencil"></i>点击</button>
  {{dateTime | sexName}}
  <fa-table :data='list' height='400' :header-cell-style="{background:'#f7f8fa'}">
      <fa-table-column prop='modelName' label='业务模型名称'></fa-table-column>
      <fa-table-column prop='businessDescription' label='模型描述' :show-overflow-tooltip='true'></fa-table-column>
      <fa-table-column label='操作'>
          <template slot-scope="scope">
              <a href="javaScript:;" class="operation-btn" @click="businessEdit(scope.row)"><i class="fa-icon-pencil"></i>编辑&nbsp;&nbsp;</a>
              <a href="javaScript:;" class="operation-btn" @click="businessDelete(scope.row)" v-if="scope.row.status!=0"><i class="fa-icon-delete"></i>删除</a>
          </template>
      </fa-table-column> 
  </fa-table>
  <fa-page :pageSize='querySerch.pageSize' :totalCount='businessCount' :currentPageNo='querySerch.pageNo' @chanage="userQuery"></fa-page>
</div>
</template>
<script src="./login.js"></script>
