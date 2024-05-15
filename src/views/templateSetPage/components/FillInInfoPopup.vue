<template>
    <el-dialog title="修改模板信息" v-model="state.show" :close-on-click-modal="false" width="50%" :before-close="closePopup">
        <el-form ref="ruleFormRef" style="max-width: 500px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="模板名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入模板名称" />
            </el-form-item>
            <el-form-item label="模板示意图" prop="img">
                <div class="uploadImages" @click.stop="triggerChange" v-if="!ruleForm.img">
                    <el-icon v-if="!state.imageUpload" size="27"><ele-Plus /></el-icon>
                    <el-icon v-else size="25" class="loading"><ele-Loading /></el-icon>
                    <input type="file" name="image" id="imageInput" ref="imageInput" accept="image/*"
                        @change="myUploadImages">
                </div>
                <div class="showBox" v-else>
                    <el-image style="width: 100px; height: 100px" :src="ruleForm.img" :zoom-rate="1.2" :max-scale="7"
                        :min-scale="0.2" :preview-src-list="[ruleForm.img]" :initial-index="0" fit="cover" />
                    <el-icon class="deleteIcon" size="20" @click.stop="deleteImg"><ele-Delete /></el-icon>
                </div>

            </el-form-item>

            <el-form-item label="模板数据" prop="params">
                <el-input v-model="ruleForm.params" style="max-width: 500px;" :rows="2" type="textarea" :readonly="true"
                    :resize="false" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closePopup" size="default">取消</el-button>
                <el-button type="primary" @click="mySetTemplate" size="default" :loading="state.loading">
                    {{ state.loading ? '上传中' : state.title }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>



<script>
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import { createTemplate, setTemplate, uploadImages } from '/@/api/singlePage/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';


export default {

    setup(props, { emit }) {

        const imageInput = ref(null);

        const ruleFormRef = ref(null);
        const formSize = ref('default');
        const ruleForm = reactive({
            name: '', // 模板示意图
            img: '', // 模板名称
            params: ``
        });

        const rules = reactive({
            name: [
                { required: true, message: '必须填写模板名称', trigger: 'blur' },

            ],
        });



        const state = reactive({
            show: false,
            loading: false,
            imageUpload: false,
            title: '',
            id: null,
        });


        // 打开弹窗
        function openPopup(templateData, info) {
            state.show = true;
            ruleForm.params = JSON.stringify(templateData);
            ruleForm.name = info.name;
            ruleForm.img = info.img;
            state.title = info.name ? '修改' : '创建';
            state.id = info.id;
        };

        // 关闭弹窗
        function closePopup() {
            state.show = false;
        };



        // 触发上传图片
        function triggerChange() {
            if (state.imageUpload) {
                return
            }
            imageInput.value.click();
        };



        // 上传图片
        async function myUploadImages() {
            var formData = new FormData();
            var fileInput = imageInput.value;
            var file = fileInput.files[0];
            formData.append('file', file);
            formData.append('path', 'image');

            state.imageUpload = true;
            let res = null;

            try {
                res = await uploadImages(formData);
            } catch (err) {
                state.imageUpload = false;
             
                return
            };
            state.imageUpload = false;

            ruleForm.img = res.data.url;
        };


        // 删除图片
        function deleteImg() {
            ruleForm.img = null;
        };


        // 验证
        function validate() {
            let tips = null;
            if (state.loading) {
                tips = '上传中,不能重复操作'
            };

            tips && ElMessage({
                message: tips,
                type: 'warning',
            });

            return !!tips;
        };


        
        // 修改模板
        async function mySetTemplate() {
            if (validate()) {
                return
            }
            await ruleFormRef.value.validate();
            await ElMessageBox.confirm(
                '你是否确定修改该模板',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            );
            state.loading = true;
            await setTemplate({
                type: 1,
                name: ruleForm.name,
                img: ruleForm.img,
                params: JSON.parse(ruleForm.params)
            }, state.id);
            state.loading = false;

            ElMessage({
                message: '模板修改成功',
                type: 'success',
            });

            emit('complete');
        };





        return { state, openPopup, closePopup, ruleFormRef, formSize, ruleForm, rules, triggerChange, myUploadImages, imageInput, deleteImg, mySetTemplate }

    }
}
</script>


<style lang="scss" scoped>
.dialog-footer {
    text-align: end;
}


.uploadImages {
    width: 100px;
    height: 100px;
    background-color: #fafafa;
    border: 1px dashed #cdd0d6;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;


    &:hover {
        border-color: #64a5f0;
    }

    #imageInput {
        display: none;
    }


    .loading {
        position: absolute;
        z-index: 1;
        animation: rotate360 2s linear infinite;
    }


}

textarea {
    resize: none;
}

.showBox {
    position: relative;

    .deleteIcon {
        position: absolute;
        top: 3px;
        right: 3px;
        cursor: pointer;
        transition: all 0.2s;
        transform: scale(1);

        font-size: 20px;
        background-color: #fff;
        border-radius: 50%;
        padding: 3px;

        &:hover {
            transform: scale(1.2);
        }
    }
}

@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>

<style lang="scss">
textarea {
    height: 100px;
    resize: none !important;
}
</style>