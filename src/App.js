import './App.css';
import {Button, ColorPicker, Divider, Drawer, Flex, message, Radio, Slider, Switch} from "antd";
import {useState} from "react";
import {RadioChangeEvent} from "antd/es/radio/interface";

/**
 * 可调整项目：
 * left：圆角，背景色，背景渐变,阴影
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [messageApi, contextHolder] = message.useMessage();
    const [drawerState, setDrawerState] = useState(0);
    const bgOptions = [
        {label: '纯色', value: 'color'},
        {label: '渐变', value: 'gradient'}
    ];
    const [leftBgMode, setLeftBgMode] = useState('color');
    const [rightBgMode, setRightBgMode] = useState('color');
    const onRightBgModeChange = (e: RadioChangeEvent) => {
        setRightBgMode(e.target.value);
    }
    const onLeftBgModeChange = (e: RadioChangeEvent) => {
        setLeftBgMode(e.target.value);
    }
    const onClose = () => {
        setDrawerState(0)
    };
    const showLeftDrawer = () => {
        setDrawerState(1);
    };
    const onLeftShadowSwitch = (show) => {
        console.log(`show:${show}`)
        setLeftShadow(show)
    }
    const onRightShadowSwitch = (show) => {
        console.log(`show:${show}`)
        setRightShadow(show)
    }
    const showRightDrawer = () => {
        setDrawerState(2);
    }
    const onLeftColorChange = (colorInt, colorCss) => {
        const colorStr = `#${colorInt.toHex()}`
        setLeftBg(colorStr)
        console.log(`setColor:${colorStr}`)
    }
    const onLeftRadiusChange = (num) => {
        setLeftRadius(num)
    }
    const onRightColorChange = (colorInt, colorCss) => {
        const colorStr = `#${colorInt.toHex()}`
        setRightBg(colorStr)
    }
    const open = drawerState > 0
    const [leftRadius, setLeftRadius] = useState(6)
    const [rightRadius, setRightRadius] = useState(6)

    const [leftBg, setLeftBg] = useState('#F4F4F7')
    const [leftBgMiddle, setLeftBgMiddle] = useState('#F4F4F7')
    const [rightBgMiddle, setRightBgMiddle] = useState('#F4F4F7')
    const [leftBgEnd, setLeftBgEnd] = useState('#e0efff')
    const [rightBgEnd, setRightBgEnd] = useState('#e0efff')

    const [leftShadow, setLeftShadow] = useState(false)
    const [rightShadow, setRightShadow] = useState(false)

    const [rightBg, setRightBg] = useState('#E0EFFF')

    const leftBgValue = leftBgMode === 'color' ? leftBg : `linear-gradient(135deg, ${leftBgMiddle} 50%, ${leftBgEnd} 100%)`
    const rightBgValue = rightBgMode === 'color' ? rightBg : `linear-gradient(135deg, ${rightBgMiddle} 50%, ${rightBgEnd} 100%)`

    const drawerTitle = drawerState === 1 ? "左边消息气泡" : "右边消息气泡"
    const leftStyle = {borderRadius: leftRadius, background: `${leftBgValue}`}
    if (leftShadow) {
        leftStyle.boxShadow = '2px 2px 5px #e0e0e0'
    }
    const rightStyle = {borderRadius: rightRadius, background: `${rightBgValue}`}
    if (rightShadow) {
        rightStyle.boxShadow = '2px 2px 5px #e0e0e0'
    }
    const leftCode = `.msg-bubble.left {
    float: left;
    margin-right: 116px;
    margin-left: 9px;
    border: 1px solid #ebeef1;
    -webkit-border-radius: ${leftRadius}px;
    border-radius: ${leftRadius}px;
    background: ${leftBgValue};
    ${leftShadow ? `box-shadow: ${leftStyle.boxShadow};` : ''}
}
.msg-bubble.left:before {
    // left: -10px;
    // top:0px;
    // background: url("msg_corner_grey_l.tiff") center / 18px;
}
`
    const rightCode = `.msg-bubble.right {
    float: right;
    margin-right: 9px;
    margin-left: 116px;
    border: 1px solid #d8ebfb;
    -webkit-border-radius: ${rightRadius}px;
    border-radius: ${rightRadius}px;
    background: ${rightBgValue};
    ${rightShadow ? `box-shadow: ${rightStyle.boxShadow};` : ''}
}
.msg-bubble.right:before {
    // right: -10px;
    // top:0px;
    // background: url("msg_corner_blue_r.tiff") center / 18px;
}
`
    const rightDrawerContent = <Flex vertical>
        <Flex vertical>
            <Divider>调整</Divider>
            <Radio.Group
                block
                options={bgOptions}
                value={rightBgMode}
                onChange={onRightBgModeChange}
                optionType="button"
                buttonStyle="solid"
            />
            <div style={{height: '10px'}}/>
            {

                rightBgMode === 'color' ?
                    <ColorPicker showText={true} defaultValue={rightBg} onChange={onRightColorChange}/> :
                    <>
                        <Flex>中间色值： <ColorPicker showText={true} defaultValue={rightBgMiddle}
                                                     onChange={(c) => setRightBgMiddle(`#${c.toHex()}`)}/></Flex>
                        <div style={{height: '10px'}}/>
                        <Flex>结尾色值： <ColorPicker showText={true} defaultValue={rightBgEnd}
                                                     onChange={(c) => setRightBgEnd(`#${c.toHex()}`)}/></Flex>
                    </>
            }
            <h4>圆角</h4>
            <Slider defaultValue={leftRadius} max={50} onChange={onLeftRadiusChange}/>
            <Flex>阴影：<Switch onChange={onRightShadowSwitch} value={rightShadow} style={{width: '33px'}}/></Flex>
            <Divider>代码</Divider>
            <pre>{rightCode}</pre>
            <Button type="primary" onClick={() => {
                navigator.clipboard.writeText(rightCode)
                messageApi.info('右侧气泡样式代码已复制')
            }}>复制代码</Button>
        </Flex>
    </Flex>
    const leftDrawerContent =
        <Flex vertical>
            <Divider>调整</Divider>
            <Radio.Group
                block
                options={bgOptions}
                value={leftBgMode}
                onChange={onLeftBgModeChange}
                optionType="button"
                buttonStyle="solid"
            />
            <div style={{height: '10px'}}/>
            {

                leftBgMode === 'color' ?
                    <ColorPicker showText={true} defaultValue={leftBg} onChange={onLeftColorChange}/> :
                    <>
                        <Flex>中间色值： <ColorPicker showText={true} defaultValue={leftBgMiddle}
                                                     onChange={(c) => setLeftBgMiddle(`#${c.toHex()}`)}/></Flex>
                        <div style={{height: '10px'}}/>
                        <Flex>结尾色值： <ColorPicker showText={true} defaultValue={leftBgEnd}
                                                     onChange={(c) => setLeftBgEnd(`#${c.toHex()}`)}/></Flex>
                    </>
            }
            <h4>圆角</h4>
            <Slider defaultValue={leftRadius} max={50} onChange={onLeftRadiusChange}/>
            <Flex>阴影：<Switch onChange={onLeftShadowSwitch} value={leftShadow} style={{width: '33px'}}/></Flex>
            <Divider>代码</Divider>
            <pre>{leftCode}</pre>
            <Button type="primary" onClick={() => {
                navigator.clipboard.writeText(leftCode)
                messageApi.info('左侧气泡样式代码已复制')
            }}>复制代码</Button>
        </Flex>
    const drawerContent = drawerState === 1 ? leftDrawerContent : rightDrawerContent
    return (
        <>
            {contextHolder}
            <Flex gap="middle" vertical>
                <Flex vertical className='content'>
                    <div style={{height: '50px'}}/>
                    <Flex onClick={showLeftDrawer}>
                        <div className='leftBubble'
                             style={leftStyle}>这是左侧消息，点击消息进行消息气泡样式调整。
                        </div>
                    </Flex>
                    <div style={{height: '10px'}}/>
                    <Flex onClick={showRightDrawer}>
                        <div className='rightBubble' style={rightStyle}>这是右侧消息，点击消息进行消息气泡样式调整。</div>
                    </Flex>
                    <Flex></Flex>
                </Flex>
            </Flex>
            <Drawer
                title={drawerTitle}
                placement="right"
                mask={false}
                closable={true}
                onClose={onClose}
                open={open}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}

export default App;
