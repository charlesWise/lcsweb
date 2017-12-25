'use strict'
//分页
import React from 'react';

export default class Pages extends React.Component {
    constructor(...props){
        super(...props);
        this.state = {
            // totalPage: 0,
            curPage: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        // this.state.totalPage = nextProps.totalPage;
    }

    _onPrev(){
        let curPage = --this.state.curPage;
        this._doAction(curPage);
    }

    _onClick(pageNo){
        let curPage = pageNo;
        this._doAction(curPage);
    }

    _onNext(){
        let curPage = ++this.state.curPage;
        this._doAction(curPage);
    }

    _doAction(curPage) {
        this.setState({
            curPage: curPage
        })
        // 请求数据的方法从 onClick 传进 props
        this.props.onClick && this.props.onClick(curPage)
        if(this.props.top){
            window.location.href = this.props.top;
        }
    }

    _getPager(){

        let self = this;

        let curPage = this.state.curPage;
        let totalPage = this.props.totalPage || 0;

        let linkPage = [];

        let firstem = (curPage - 3) > 1 ? <span key={'start'}>…</span> : null;
        let endem = null;

        if (totalPage != 1) {
            if (curPage == 1) {
                linkPage.push(<span key={1} className='current'>1</span>)
            } else {
                linkPage.push(<span key={1} onClick={self._onClick.bind(self,1)}>1</span>)
                linkPage.push(firstem)
            }
        }

        let endPage = (curPage + 2) < totalPage ? (curPage + 2) : totalPage;
        let startPage = (curPage - 2) > 0 ? (curPage - 2) : 1;

        for (let i = startPage; i <= endPage; i++) {
            if (i == 1) continue;
            let page = i;
            if (page == curPage){
                if (totalPage != 1) {
                    linkPage.push(<span key={page} className='current'>{page}</span>)
                }
            }else{
                linkPage.push(<span key={page} onClick={self._onClick.bind(self, page)}>{page}</span>)
            }
        }

        if (curPage != totalPage) {
            let endem = (curPage + 3) >= totalPage ? null : <span key={'end'}>…</span>;
            linkPage.push(endem)
            linkPage.push(<span key={totalPage} onClick={self._onClick.bind(self, totalPage)}>{totalPage}</span>)

        }

        return linkPage;
    }

    render(){
        if(this.props.totalPage < 1) return null;
        return (
            <div className="pageWraper">
                {
                    this.state.curPage > 1 &&
                    <span onClick={this._onPrev.bind(this)}>上一页</span>
                }
                {this._getPager()}
                {
                    this.state.curPage < this.props.totalPage &&
                    <span onClick={this._onNext.bind(this)}>下一页</span>
                }
            </div>
        )
    }
}
