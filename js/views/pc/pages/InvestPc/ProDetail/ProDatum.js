'use strict'
//查看文件
import React from 'react';

export default class ProDatum extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
        }
    }

    render(){
        let detail = this.props.detailInfo || {};
        let pdfList = detail.attach;
        let imgList = [];
        let detail_attach = detail.pro_detail_attach;
        let manage_attach = detail.fund_manage_attach;
        if (!detail_attach) imgList.push(detail_attach);
        if (!manage_attach) imgList.push(manage_attach);
        return (
            <div className="detail-cont-div2">
                {
                    (Array.isArray(pdfList) && pdfList.length > 0) &&
                    <div>
                        <h3>材料预览</h3>
                        {
                            pdfList.map((item, index, arr) => {
                                return (
                                    <p key={index} className="del-con-pdf"><i></i><a href={item.url}>{index}、{item.name}</a></p>
                                )
                            })
                        }
                            
                    </div>
                }
                {
                    (Array.isArray(imgList) && imgList.length > 0) &&
                    <div>
                        <h3>资料图片</h3>
                        <p className="del-con-pic">
                            {
                                imgList.map((item, index, arr) => {
                                    return (
                                        <img key={index} src={item} />
                                    )
                                })
                            }
                        </p>
                    </div>
                }
            </div>
        )
    }
}
