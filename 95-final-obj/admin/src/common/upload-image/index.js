import React,{ Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

class UploadImage extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          previewVisible: false,
          previewImage: '',
          fileList: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handlePreview = this.handlePreview.bind(this);

  }
  

  handleCancel(){
    this.setState({ previewVisible: false })
  }

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }){
    //将filelist地址传递给父组件 (选择图片上传-上传发送到服务器-服务器存储-服务器拿到图片地址回馈给前端)
    //console.log('fl:',fileList);
    this.setState({ fileList },()=>{
        this.props.getFileList(fileList.map((file)=>{
                return  file.response;
        }).join(','));
    })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          withCredentials={true}
        >
          {fileList.length >= this.props.max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

//ReactDOM.render(<PicturesWall />, mountNode);
export default UploadImage;