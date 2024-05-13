<template>
    <div>
      <h2>Sortable List</h2>
      <draggable v-model="list" @end="onDragEnd">
        <transition-group>
          <div v-for="(item, index) in list" :key="item.id" class="item" @mousedown="onMouseDown(index)">
            {{ item.name }}
          </div>
        </transition-group>
      </draggable>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  import { reactive } from 'vue';
  
  export default {
    components: {
      draggable,
    },
    setup() {
      const list = reactive([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
      ]);
  
      let draggingIndex = null;
  
      const onMouseDown = (index) => {
        draggingIndex = index;
      };
  
      const onDragEnd = () => {
        if (draggingIndex !== null) {
          const item = list.splice(draggingIndex, 1)[0];
          list.splice(draggingIndex < list.length ? draggingIndex : list.length, 0, item);
          draggingIndex = null;
        }
      };
  
      return { list, onMouseDown, onDragEnd };
    },
  };
  </script>
  
  <style>
  .item {
    padding: 10px;
    margin: 5px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: move;
  }
  </style>
  