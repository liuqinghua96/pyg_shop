import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AddGoods',
  components: {
    quillEditor
  },
  data () {
    return {
      activeStep: 0,
      baseForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          { required: true, message: '商品名称必填', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '所属分类必须为三级', trigger: 'change' }
        ],
        goods_price: [
          { required: true, message: '商品价格必填', trigger: 'blur' },
          { type: 'number', message: '商品价格为数字值' }
        ],
        goods_number: [
          { required: true, message: '商品数量必填', trigger: 'blur' },
          { type: 'number', message: '商品数量为数字值' }
        ],
        goods_weight: [
          { required: true, message: '商品重量必填', trigger: 'blur' },
          { type: 'number', message: '商品重量为数字值' }
        ]
      },
      // 级联对应部分
      selectValue: [],
      optionsList: [],
      // 动态参数和静态参数列表
      manyAttrs: [],
      onlyAttrs: [],
      // 图片上传相关
      uploadUrl: this.$http.defaults.baseURL + 'upload',
      requsetHeader: {Authorization: sessionStorage.getItem('token')},
      // 预览图片
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    selectValue (now, old) {
      if (now.length === 3) {
        this.baseForm.goods_cat = now.join(',')
      } else {
        this.baseForm.goods_cat = ''
      }
    }
  },
  methods: {
    async submitAddGood () {
      this.baseForm.attrs = [...this.manyAttrs, ...this.onlyAttrs]
      const { data: { meta } } = await this.$http.post('goods', this.baseForm)
      if (meta.status !== 201) return this.$message.error(meta.msg)
      this.$router.push('/goods')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.response.data.url
      this.dialogVisible = true
    },
    handleRemove (file) {
      const url = file.response.data.tmp_path
      const index = this.baseForm.pics.findIndex(item => item.pic === url)
      this.baseForm.pics.splice(index, 1)
    },
    imgSuccess (response) {
      this.baseForm.pics.push({pic: response.data.tmp_path})
    },
    beforeLeave (now, old) {
      if (old === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.baseForm.validate(valid => {
            if (valid) {
              this.activeStep = +now
              this.getParams('many')
              this.getParams('only')
              resolve()
            } else {
              reject(new Error('校验失败'))
            }
          })
        })
      } else {
        this.activeStep = +now
      }
    },
    async getParams (type) {
      let id = this.selectValue[2]
      const {
        data: { data, meta }
      } = await this.$http.get(`categories/${id}/attributes`, {
        params: { sel: type }
      })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this[type + 'Attrs'] = data
    },
    // 级联数据
    handleChange () {
      if (this.selectValue.length === 3) {
        this.baseForm.goods_cat = this.selectValue.join(',')
      } else {
        this.baseForm.goods_cat = ''
      }
    },
    async getData () {
      const {
        data: { data, meta }
      } = await this.$http.get('categories', { params: { type: 3 } })
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.optionsList = data
    }
  },
  mounted () {
    this.getData()
  }
}
