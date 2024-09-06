import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import moment from 'moment';
import MakeWillPDF from '../../../assets/samplepdf/makeWill.pdf';

function MakeWill(props) {
    const [willSelOption, setWillSelOption] = useState(0);
    const [activeKey, setActiveKey] = useState('0');
    const [wills, setWills] = useState({
        ...props.makeWill.wills,
        fileWill: {},
        fileEstate: {},
        hand: {
            will_note: '',
            pdf_name: '',
            id: -1
        },
        estate: {
            id: '',
            pdf_name: '',
            reg_num: '',
            location: '',
            prop_type: '',
            owner: '',
            address: '',
            land_category: '',
            area: 0,
            acq_date: '',
            reg_right: '',
            prev_owner: '',
            boundary_detail: '',
            usage_right: '',
            other_right: '',
            restriction: '',
            shared_prop: '',
            own_ratio: 0,
            co_owner: '',
        }
    });

    const pdfSampleURL = '/data/sample/makeWill.pdf';

    const handleUpdateWill = async (type = 0) => {
        if (Number(willSelOption) === 0) {
            if(wills.fileWill.name === undefined)
                {
                    toast.error('保存する遺言を選択してください。');
                    return;
                }
            else if(wills.fileEstate.name === undefined)
                {
                    toast.error('不動産のリストを追加してください。');
                    return;
                }
            else {
                await uploadPdf("fileWill");
                await uploadPdf("fileEstate");
            }
        }
        else if(Number(willSelOption) === 1)
        {
            if(type == 1)
                {
                    if(wills.hand.will_note === '')
                        {
                            toast.error('遺言書にメモを添えてください。');
                            return;
                        }
                    try
                    {
                        const result = await createPdf();
                        toast.success("成功しました。");
                    }
                    catch(ex)
                    {
                        toast.error("失敗しました。");
                    }
                }
            else if(type == 2)
                {
                    if(wills.estate.reg_num == '' || wills.estate.location === '' || wills.estate.prop_type === '' || wills.estate.owner === '' || wills.estate.address === '' || wills.estate.land_category == ''
                    || wills.estate.area == 0 || wills.estate.acq_date == '' || wills.estate.reg_right == '' || wills.estate.boundary_detail == '' || wills.estate.shared_prop == '' || wills.estate.own_ratio == 0)
                    {
                        toast.error('遺産リストにメモを添える。');
                        return;
                    }
                    try
                    {
                        await createPdf(1);
                        toast.success("成功しました。");
                    }
                    catch(ex)
                    {
                        toast.error("失敗しました。");
                    }
                }
        }
        // else {
        //     switch (Number(willSelOption)) {
        //         case 1:
        //             createPdf();
        //             break;
        //         case 0:
        //             await uploadPdf();
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }

    const createPdf = async (opt = 0) => {
        const updatedWills = {
            ...wills,
            will_status: 1,
        };

        if(opt == 0)
        {
            try {
                await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_url });
            } catch (error) {
                // toast.error('ネットワーク接続を確認してください。');
            }
    
            try {
                console.log(updatedWills.hand)
                const result = await axios.post(process.env.REACT_APP_API_URL + '/createWills', {
                    ...updatedWills.hand,
                    userId: wills.id
                });
                console.log(result);
                if(result.data.will_real_url)
                    updatedWills.will_real_url = result.data.will_real_url;
                setWills(updatedWills);
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }
        }
        else if(opt === 1)
        {
            try {
                await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_estate });
            } catch (error) {
                // toast.error('ネットワーク接続を確認してください。');
            }
    
            try {
                let result = {};
                if(wills.estate.id == -1)
                    {
                        try
                        {
                            result = await axios.post(process.env.REACT_APP_API_URL + '/createEstateWill', {
                                ...updatedWills.estate,
                                userId: wills.id
                            });
                            if(result.data)
                                {
                                    setWills((prev) => ({
                                        ...prev,
                                        will_real_estate: result.data
                                    }));
                                }
                        }
                        catch(error)
                        {
                            toast.error('失敗しました');
                        }
                    }
                else
                    {
                        try {
                            result = await axios.post(process.env.REACT_APP_API_URL + '/updateEstateWill', {
                                ...updatedWills.estate,
                                userId: wills.id
                            });
                            setWills((prev) => ({
                                ...prev,
                                will_real_estate: result.data
                            }));
                        }
                        catch(error)
                        {
                            toast.error('失敗しました');
                        }
                    }
                toast.success('ファイルアップロード成功。');
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            }
        }
    }

    const uploadPdf = async (fileAttach) => {
        try {
            const formData = new FormData();
            if(fileAttach === "fileWill")
                {
                    formData.append('file', wills.fileWill);
                    try {
                        await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_url });
                    } catch (error) {
                        toast.error('ネットワーク接続を確認してください。');
                    }
                }
            else if(fileAttach === "fileEstate")
                {
                    formData.append('file', wills.fileEstate);
                    try {
                        await axios.post(process.env.REACT_APP_API_URL + '/removeFile', { fileInfo: wills.will_real_estate });
                    } catch (error) {
                        toast.error('ネットワーク接続を確認してください。');
                    }
                }

            // update the will

            const response = await axios.post(process.env.REACT_APP_API_URL + '/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                let updatedWills = {};
                if(fileAttach === "fileWill")
                    updatedWills = {
                        ...wills,
                        will_real_url: '/data/' + response.data.filename,
                        will_status: 1,
                    };
                else if(fileAttach === "fileEstate")
                    updatedWills = {
                        ...wills,
                        will_real_estate: '/data/' + response.data.filename,
                        will_status: 1,
                    };
                

                try {
                    await axios.post(process.env.REACT_APP_API_URL + '/updateWills', updatedWills);

                    setWills(updatedWills);
                    toast.success('ファイルアップロード成功。');
                } catch (error) {
                    toast.error('ネットワーク接続を確認してください。');
                }
            }

            // update the estate will

        } catch (error) {
            toast.error('ネットワーク接続を確認してください。');
        }
    }

    const pdfFileUpload = (event, index) => {
        if(index === 0)
        {
            let file = event.target.files[0];

            if (file && file.type !== 'application/pdf') {
                toast.error('ファイルタイプが正しくありません。');
                file = {};
            }

            setWills((prev) => ({
                ...prev,
                fileWill: file,
            }));
        }
        else if(index === 1)
        {
            let file = event.target.files[0];

            if (file && file.type !== 'application/pdf') {
                toast.error('ファイルタイプが正しくありません。');
                file = {};
            }

            setWills((prev) => ({
                ...prev,
                fileEstate: file,
            }));
        }
    };

    useEffect(() => {
        setWills({
            ...props.makeWill.wills,
            fileWill: {},
            fileEstate: {},
            hand: {
                will_note: '',
                pdf_name: '',
                id: -1
            },
            estate: {
                id: -1,
                pdf_name: '',
                reg_num: '',
                location: '',
                prop_type: '',
                owner: '',
                address: '',
                land_category: '',
                area: 0,
                acq_date: '',
                reg_right: '',
                prev_owner: '',
                boundary_detail: '',
                usage_right: '',
                other_right: '',
                restriction: '',
                shared_prop: '',
                own_ratio: 0,
                co_owner: '',
            }
        });
    }, [props])

    useEffect(() => {
        if(wills.will_real_estate !== '')
            axios.post(process.env.REACT_APP_API_URL + '/getEstateWill', {pdf_name: wills.will_real_estate})
            .then(res => {
                if(res.data[0])
                {
                    const acq_date = moment(res.data[0].acq_date).format('YYYY-MM-DD');
                    setWills(prev => ({ ...prev, estate: { ...res.data[0], acq_date } }))
                    setWills(prev => ({...prev, will_status: 1}))
                }
            })
            .catch(err => {

            })
    }, [wills.will_real_estate])
    // wills.will_real_url

    useEffect(() => {
        if(wills.will_real_url !== '')
            axios.post(process.env.REACT_APP_API_URL + '/getHandWill', {pdf_name: wills.will_real_url})
            .then(res => {
                if(res.data[0])
                {
                    setWills(prev => ({ ...prev, hand: { ...res.data[0] } }));
                    setWills(prev => ({...prev, will_status: 1}))
                }
            })
            .catch(err => {

            })
    }, [wills.will_real_url])

    useEffect(() => {
        console.log(wills, 'wills->here---->');
    }, [wills])

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };

    const onChangeEstateInput = (e) => {
        const { name, value } = e.target;
        console.log(wills.hand, '----->')
        setWills((prev) => ({ ...prev, estate: {...prev.estate, [name]: value} }));
    }

    return (
        <div className='make-will'>
            <h3 className="mb-5">自筆証書遺言</h3>
            <h6>遺言書を記載しておけば、死後の財産分与の際に混乱を避けることができます。</h6><br />
            <h6>遺言書を作成する場合、保管場所についても整理しておけば、探す手間が省け、手続きまでの時間を短縮することができます。</h6><br />
            <h6>また、OMOWILLは法的な効力がないため、財産分与の割合や相続人を指定したい場合は、遺言書を作成しておくことをおすすめします。</h6><br />
            <h6>遺言書作成の詳しい紹介は、以下のリンクからご覧いただけます。</h6><br />

            <Link to={MakeWillPDF} className='fw-bold' target='_blank' rel='noopener noreferrer'><h6><i className="fa fa-caret-right me-1" aria-hidden="true" target="_blank" />詳細情報</h6></Link>

            <div className='d-flex justify-content-center pt-5 pb-5 mt-5'>
                <div className="d-flex flex-column born-pdf-field">
                    <div className='d-flex flex-column born-pdf-field'>
                        <iframe
                            title="deathVideo"
                            src={wills.will_status === 0 ? pdfSampleURL + `#toolbar=0` : "/data/" + wills.will_real_url + `#toolbar=0`}
                            width="100%"
                            height="400px"
                            border="none"
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => window.open(wills.will_status === 0 ? pdfSampleURL : "/data/" + wills.will_real_url, '_blank')}>詳細を表示</button>
                    </div>
                    <div className='d-flex flex-column mt-2 born-pdf-field'>
                        <iframe
                            title="deathVideo"
                            src={wills.will_status === 0 ? pdfSampleURL + `#toolbar=0` : "/data/" + wills.will_real_estate + `#toolbar=0`}
                            width="100%"
                            height="400px"
                            border="none"
                        />
                        <button
                            className='btn btn-primary'
                            onClick={() => window.open(wills.will_status === 0 ? pdfSampleURL : "/data/" + wills.will_real_estate, '_blank')}>詳細を表示</button>
                    </div>
                </div>

                <div className='form ps-2 pe-2'>
                    <div className="input-group">
                        <span className="input-group-text">自筆証書遺言</span>
                        <select
                            className="form-select"
                            value={willSelOption}
                            onChange={(event) => { setWillSelOption(event.target.value); }}
                        >
                            <option value={0}>PDF化ファイル掲載</option>
                            <option value={1}>自筆証書遺言文字入力</option>
                        </select>
                    </div>

                    {/* <div className="input-group">
                        <span className="input-group-text">財産目録見本</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="財産目録見本"
                            name="will_real_estate"
                            value={wills.will_real_estate}
                            onChange={(e) => {
                                const { name, value } = e.target;
                                setWills((prev) => ({ ...prev, [name]: value }));
                            }}
                        />
                    </div> */}

                    {
                        Number(willSelOption) === 0 &&
                        <>
                            <div className="input-group">
                                <span className="input-group-text">遺書PDF</span>
                                <input
                                    type="file"
                                    className="form-control"
                                    placeholder="PDFをアップロード"
                                    name="file"
                                    onChange={(e) => pdfFileUpload(e, 0)}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">相続財産目録</span>
                                <input
                                    type="file"
                                    className="form-control"
                                    placeholder="PDFをアップロード"
                                    name="file"
                                    onChange={(e) => pdfFileUpload(e, 1)}
                                />
                            </div>
                            <div className="d-flex flex-row-reverse mt-5">
                                <button className="btn btn-primary" type="button" onClick={handleUpdateWill}>Update</button>
                            </div>
                        </>
                    }

                    {
                        Number(willSelOption) === 1 &&
                        <>
                            
                            <Accordion defaultActiveKey="0" onSelect={handleSelect}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>遺書PDF</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="input-group">
                                            <span className="input-group-text align-items-start">詳細説明</span>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                rows={20}
                                                maxLength="10000"
                                                style={{ resize: 'none' }}
                                                placeholder="死亡時に残すメッセージ"
                                                name='will_note'
                                                value={wills.hand.will_note}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setWills((prev) => ({ ...prev, hand: { ...prev.hand, [name]: value } }));
                                                }}
                                            />
                                        </div>
                                        <div className="d-flex flex-row-reverse mt-5">
                                            <button className="btn btn-primary" type="button" onClick={() => handleUpdateWill(1)}>Update</button>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>相続財産目録</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion defaultActiveKey="5" onSelect={handleSelect}>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header>一般情報</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">登記番号</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="登記番号"
                                                        name='reg_num'
                                                        value={wills.estate.reg_num}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">所在地 </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="所在地 "
                                                        name='location'
                                                        value={wills.estate.location}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">財産の種類</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="財産の種類"
                                                        name='prop_type'
                                                        value={wills.estate.prop_type}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">所有者名</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="所有者名"
                                                        name='owner'
                                                        value={wills.estate.owner}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start"> 住所</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder=" 住所"
                                                        name='address'
                                                        value={wills.estate.address}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>物件詳細情報</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">地目</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="地目"
                                                        name='land_category'
                                                        value={wills.estate.land_category}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">地積 </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="地積 "
                                                        name='area'
                                                        value={wills.estate.area}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">取得日</span>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="取得日"
                                                        name='acq_date'
                                                        value={wills.estate.acq_date}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">登記された権利</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="登記された権利"
                                                        name='reg_right'
                                                        value={wills.estate.reg_right}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">前所有者</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="前所有者"
                                                        name='prev_owner'
                                                        value={wills.estate.prev_owner}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>その他の物件詳細</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="input-group">
                                                        <span className="input-group-text align-items-start">境界の詳細</span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="境界の詳細"
                                                            name='boundary_detail'
                                                            value={wills.estate.boundary_detail}
                                                            onChange={onChangeEstateInput}
                                                        />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-text align-items-start">使用権 </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="使用権 "
                                                            name='usage_right'
                                                            value={wills.estate.usage_right}
                                                            onChange={onChangeEstateInput}
                                                        />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-text align-items-start">その他の権利</span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="その他の権利"
                                                            name='other_right'
                                                            value={wills.estate.other_right}
                                                            onChange={onChangeEstateInput}
                                                        />
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-text align-items-start">制限事項</span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="制限事項"
                                                            name='restriction'
                                                            value={wills.estate.restriction}
                                                            onChange={onChangeEstateInput}
                                                        />
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>共有所有権の詳細</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">共有物件</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="共有物件"
                                                        name='shared_prop'
                                                        value={wills.estate.shared_prop}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">持分割合 </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="持分割合 "
                                                        name='own_ratio'
                                                        value={wills.estate.own_ratio}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">共同所有者</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="共同所有者"
                                                        name='co_owner'
                                                        value={wills.estate.co_owner}
                                                        onChange={onChangeEstateInput}
                                                    />
                                                </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <div className="d-flex flex-row-reverse mt-5">
                                                <button className="btn btn-primary" type="button" onClick={() => handleUpdateWill(2)}>Update</button>
                                            </div>
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MakeWill;
