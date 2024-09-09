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
            land: {
                id: '',
                preparation: '',
                map_num: '',
                estate_num: '',
                date: '',
                serial: '',
                location: '',
                land_num: '',
                land_use: '',
                land_area: 0,
                cause_date: '',
                reg_date: '',
                owner: ''
            },
            owner_right: [
                // {
                //     id: '',
                //     order_num: '',
                //     reg_purpose: '',
                //     reg_date: '',
                //     cause: '',
                //     other_info: ''
                // }
            ],
            other_right: [
                // {
                //     id: '',
                //     order_num: '',
                //     reg_purpose: '',
                //     reg_date: '',
                //     cause: '',
                //     other_info: ''
                // }
            ],
            cert_info: {
                cert_num: '',
                cert_copy: '',
                mort_info: [
                    // {
                    //     id: '',
                    //     num: '',
                    //     rights_desc: '',
                    //     order_num: '',
                    //     other: ''
                    // }
                ]
            }
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
                    let validationErrors = [];

                    // if(wills.estate.reg_num == '' || wills.estate.location === '' || wills.estate.prop_type === '' || wills.estate.owner === '' || wills.estate.address === '' || wills.estate.land_category == ''
                    // || wills.estate.area == 0 || wills.estate.acq_date == '' || wills.estate.reg_right == '' || wills.estate.boundary_detail == '' || wills.estate.shared_prop == '' || wills.estate.own_ratio == 0)
                    // {
                    //     toast.error('遺産リストにメモを添える。');
                    //     return;
                    // }
                    // Validate estate land fields
                    const { land } = wills.estate;
                    if (!land.estate_num || !land.location || !land.land_num || !land.land_use || land.land_area === 0 || !land.cause_date || !land.reg_date || !land.owner || !land.date || !land.serial) {
                        validationErrors.push("Estate land fields are missing.");
                    }

                    // Validate estate owner_right array
                    wills.estate.owner_right.forEach((right, index) => {
                        if (!right.reg_purpose || !right.reg_date || !right.cause) {
                            validationErrors.push(`Owner Right at index ${index} is missing fields.`);
                        }
                    });

                    // Validate estate other_right array
                    wills.estate.other_right.forEach((right, index) => {
                        if (!right.reg_purpose || !right.reg_date || !right.cause || !right.other_info) {
                            validationErrors.push(`Other Right at index ${index} is missing fields.`);
                        }
                    });

                    const { cert_info } = wills.estate;
                    if (!cert_info.cert_num || !cert_info.cert_copy) {
                        validationErrors.push("Certification info fields are missing.");
                    }

                    cert_info.mort_info.forEach((mort, index) => {
                        if (!mort.rights_desc || !mort.ranking_number) {
                            validationErrors.push(`Mortgage info at index ${index} is missing fields.`);
                        }
                    });

                    // If any validation errors exist, show them
                    if (validationErrors.length > 0) {
                        validationErrors.forEach((error) => toast.error(error));
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
                debugger
                console.log(result.data.will_real_url, '-------->');
                // if(result.data.will_real_url != undefined)
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
                id: '',
                pdf_name: '',
                land: {
                    id: '',
                    preparation: '',
                    map_num: '',
                    estate_num: '',
                    location: '',
                    land_num: '',
                    land_use: '',
                    land_area: 0,
                    cause_date: '',
                    reg_date: '',
                    owner: ''
                },
                owner_right: [
                    // {
                    //     id: '',
                    //     order_num: '',
                    //     reg_purpose: '',
                    //     reg_date: '',
                    //     cause: '',
                    //     other_info: ''
                    // }
                ],
                other_right: [
                    // {
                    //     id: '',
                    //     order_num: '',
                    //     reg_purpose: '',
                    //     reg_date: '',
                    //     cause: '',
                    //     other_info: ''
                    // }
                ],
                cert_info: {
                    cert_num: '',
                    cert_copy: '',
                    mort_info: [
                        // {
                        //     id: '',
                        //     num: '',
                        //     rights_desc: '',
                        //     order_num: '',
                        //     other: ''
                        // }
                    ]
                }
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
                    // setWills(prev => ({ ...prev, estate: { ...res.data[0], acq_date } }))
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
        setWills((prev) => ({ ...prev, estate: {...prev.estate, [name]: value} }));
    }

    const onChangeEstateLandInput = (e) => {
        const { name, value } = e.target;
        console.log(wills.hand, '----->')
        setWills((prev) => ({ ...prev, estate: {...prev.estate, land: { ...prev.estate.land, [name] : value } } }));
    }

    const onChangeEstateOwnerRightInput = (e, index) => {
        const { name, value } = e.target;
    
        // First, copy the current owner_right array
        const updatedOwnerRights = [...wills.estate.owner_right];
    
        // Update the specific field in the object at the given index
        updatedOwnerRights[index] = {
            ...updatedOwnerRights[index], // Keep the other fields in the object
            [name]: value // Update the specific field with the new value
        };
    
        // Now set the updated state
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                owner_right: updatedOwnerRights // Set the updated array
            }
        }));
    };

    const addEstateOwnerRight = () => {
        let array = [...wills.estate.owner_right];
        array.push(
            {
                id: '',
                reg_purpose: '',
                reg_date: '',
                cause: '',
                other_info: ''
            }
        );
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                owner_right: array // Set the updated array
            }
        }));
    }

    const removeEstateOwnerRight = (index) => {
        let array = [...wills.estate.owner_right];
        array.splice(index, 1);
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                owner_right: array // Set the updated array
            }
        }));
    }

    const onChangeEstateOtherRightInput = (e, index) => {
        const { name, value } = e.target;
    
        // First, copy the current other_right array
        const updatedOtherRights = [...wills.estate.other_right];
    
        // Update the specific field in the object at the given index
        updatedOtherRights[index] = {
            ...updatedOtherRights[index], // Keep the other fields in the object
            [name]: value // Update the specific field with the new value
        };
    
        // Now set the updated state
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                other_right: updatedOtherRights // Set the updated array
            }
        }));
    };

    const addEstateOtherRight = () => {
        let array = [...wills.estate.other_right];
        array.push(
            {
                id: '',
                reg_purpose: '',
                reg_date: '',
                cause: '',
                other_info: ''
            }
        );
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                other_right: array // Set the updated array
            }
        }));
    }

    const removeEstateOtherRight = (index) => {
        let array = [...wills.estate.other_right];
        array.splice(index, 1);
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                other_right: array // Set the updated array
            }
        }));
    }

    const onChangeEstateCertInput = (e, index = 0) => {
        const { name, value } = e.target;
    
        if(name === "cert_num" || name === "cert_copy")
        {
            setWills((prev) => ({
                ...prev,
                estate: {
                    ...prev.estate,
                    cert_info: {
                        ...prev.estate.cert_info,
                        [name] : value
                    }
                }
            }));
        }
        else
        {
            // First, copy the current cert_info.mort_info array
            const updatedCertRights = [...wills.estate.cert_info.mort_info];
        
            // Update the specific field in the object at the given index
            updatedCertRights[index] = {
                ...updatedCertRights[index], // Keep the other fields in the object
                [name]: value // Update the specific field with the new value
            };
        
            // Now set the updated state
            setWills((prev) => ({
                ...prev,
                estate: {
                    ...prev.estate,
                    cert_info: {
                        ...prev.estate.cert_info,
                        mort_info: updatedCertRights // Set the updated array
                    }
                }
            }));    
        }
    };

    const addEstateCertInfo = () => {
        let array = [...wills.estate.cert_info.mort_info];
        array.push(
            {
                id: '',
                rights_desc: '',
                ranking_number: '',
                other: ''
            }
        );
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                cert_info: {
                    ...prev.estate.cert_info,
                    mort_info: array // Set the updated array
                }
            }
        }));
    }

    const removeEstateCertInfo = (index) => {
        let array = [...wills.estate.cert_info.mort_info];
        array.splice(index, 1);
        setWills((prev) => ({
            ...prev,
            estate: {
                ...prev.estate,
                cert_info: {
                    ...prev.estate.cert_info,
                    mort_info: array // Set the updated array
                }
            }
        }));
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
                                <button className="btn btn-primary" type="button" onClick={handleUpdateWill}>Pdf 生成</button>
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
                                            <button className="btn btn-primary" type="button" onClick={() => handleUpdateWill(1)}>Pdf 生成</button>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>相続財産目録</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion defaultActiveKey="5" onSelect={handleSelect}>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header>土地の表示</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">不動産番号</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="00000000000000000000"
                                                        name='estate_num'
                                                        value={wills.estate.land.estate_num}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">所在 </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="特別区南都町一丁目 "
                                                        name='location'
                                                        value={wills.estate.land.location}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">地番</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="10番1"
                                                        name='land_num'
                                                        value={wills.estate.land.land_num}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">地目</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="宅地"
                                                        name='land_use'
                                                        value={wills.estate.land.land_use}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start"> 地積</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="300"
                                                        min="0"
                                                        name='land_area'
                                                        value={wills.estate.land.land_area}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start"> 原因及びその日付</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="不詳"
                                                        name='cause_date'
                                                        value={wills.estate.land.cause_date}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start"> 登記の日付</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="平成20年10月14日"
                                                        name='reg_date'
                                                        value={wills.estate.land.reg_date}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start"> 所有者</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="特別区南都町一丁目1番1号 甲野 太郎"
                                                        name='owner'
                                                        value={wills.estate.land.owner}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            {/* here */}
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>【権利部 (甲区)】 (所有権に関する事項)</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="d-flex justify-content-end mb-2">
                                                        <button type="button" class="btn btn-dark" onClick={addEstateOwnerRight}>追加</button>
                                                    </div>
                                                    {
                                                        <Accordion  onSelect={handleSelect}>
                                                            {
                                                                wills.estate.owner_right.map((item, index) => (
                                                                    <Accordion.Item eventKey={index + "add"}>
                                                                        <Accordion.Header>権利部 (甲区) {index  + 1}</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {/* <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 順位番号</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="1"
                                                                                        name='order_num'
                                                                                        value={wills.estate.owner_right[index].order_num}
                                                                                        onChange={(e) => onChangeEstateOwnerRightInput(e, index)}
                                                                                    />
                                                                                </div> */}
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 登記の目的</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="所有権保存"
                                                                                        name='reg_purpose'
                                                                                        value={wills.estate.owner_right[index].reg_purpose}
                                                                                        onChange={(e) => onChangeEstateOwnerRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 受付年月日<br/>受付番号</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="平成20年10月15日 第6037号"
                                                                                        name='reg_date'
                                                                                        value={wills.estate.owner_right[index].reg_date}
                                                                                        onChange={(e) => onChangeEstateOwnerRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 原因</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="平成20年10月14日"
                                                                                        name='cause'
                                                                                        value={wills.estate.owner_right[index].cause}
                                                                                        onChange={(e) => onChangeEstateOwnerRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start text-break" style={{whiteSpace: 'normal'}}>権利者その他の事項</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="所有者 特別区南都町一丁目1番1号甲野 太郎"
                                                                                        name='other_info'
                                                                                        value={wills.estate.owner_right[index].other_info}
                                                                                        onChange={(e) => onChangeEstateOwnerRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="d-flex justify-content-end mb-2">
                                                                                    <button type="button" class="btn btn-dark" onClick={removeEstateOwnerRight}>削除</button>
                                                                                </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                ))
                                                            }
                                                        </Accordion>
                                                    }
                                                {/* <div className="input-group">
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
                                                </div> */}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>【権利部 (乙区)】 (所有権以外の権利に関する事項)</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="d-flex justify-content-end mb-2">
                                                        <button type="button" class="btn btn-dark" onClick={addEstateOtherRight}>追加</button>
                                                    </div>
                                                    {
                                                        <Accordion  onSelect={handleSelect}>
                                                            {
                                                                wills.estate.other_right.map((item, index) => (
                                                                    <Accordion.Item eventKey={index + "add"}>
                                                                        <Accordion.Header>権利部 (甲区) {index  + 1}</Accordion.Header>
                                                                            <Accordion.Body>
                                                                                {/* <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 順位番号</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="1"
                                                                                        name='order_num'
                                                                                        value={wills.estate.other_right[index].order_num}
                                                                                        onChange={(e) => onChangeEstateOtherRightInput(e, index)}
                                                                                    />
                                                                                </div> */}
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 登記の目的</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="所有権保存"
                                                                                        name='reg_purpose'
                                                                                        value={wills.estate.other_right[index].reg_purpose}
                                                                                        onChange={(e) => onChangeEstateOtherRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 受付年月日<br/>受付番号</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="平成20年10月15日 第6037号"
                                                                                        name='reg_date'
                                                                                        value={wills.estate.other_right[index].reg_date}
                                                                                        onChange={(e) => onChangeEstateOtherRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start"> 原因</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="平成20年10月14日"
                                                                                        name='cause'
                                                                                        value={wills.estate.other_right[index].cause}
                                                                                        onChange={(e) => onChangeEstateOtherRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="input-group">
                                                                                    <span className="input-group-text align-items-start text-break" style={{whiteSpace: 'normal'}}>権利者その他の事項</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="所有者 特別区南都町一丁目1番1号甲野 太郎"
                                                                                        name='other_info'
                                                                                        value={wills.estate.other_right[index].other_info}
                                                                                        onChange={(e) => onChangeEstateOtherRightInput(e, index)}
                                                                                    />
                                                                                </div>
                                                                                <div className="d-flex justify-content-end mb-2">
                                                                                    <button type="button" class="btn btn-dark" onClick={removeEstateOtherRight}>削除</button>
                                                                                </div>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                ))
                                                            }
                                                        </Accordion>
                                                    }
                                                    {/* <div className="input-group">
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
                                                    </div> */}
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
                                                        name='cert_num'
                                                        value={wills.estate.cert_info.cert_num}
                                                        onChange={onChangeEstateCertInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">持分割合 </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="持分割合 "
                                                        name='cert_copy'
                                                        value={wills.estate.cert_info.cert_copy}
                                                        onChange={onChangeEstateCertInput}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-end mb-2">
                                                    <button type="button" class="btn btn-dark" onClick={addEstateCertInfo}>追加</button>
                                                </div>
                                                {
                                                    <Accordion  onSelect={handleSelect}>
                                                        {
                                                            wills.estate.cert_info.mort_info.map((item, index) => (
                                                                <Accordion.Item eventKey={index + "add"}>
                                                                    <Accordion.Header>共有所有権の詳細 {index  + 1}</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="input-group">
                                                                                <span className="input-group-text align-items-start" style={{whiteSpace: 'normal'}}> 担保の目的である権利の表示</span>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="特別区南都町一丁目 101番の土地"
                                                                                    name='rights_desc'
                                                                                    value={wills.estate.cert_info.mort_info[index].rights_desc}
                                                                                    onChange={(e) => {onChangeEstateCertInput(e, index)}}
                                                                                />
                                                                            </div>
                                                                            <div className="input-group">
                                                                                <span className="input-group-text align-items-start">順位番号</span>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="1"
                                                                                    name='ranking_number'
                                                                                    value={wills.estate.cert_info.mort_info[index].ranking_number}
                                                                                    onChange={(e) => {onChangeEstateCertInput(e, index)}}
                                                                                />
                                                                            </div>
                                                                            <div className="input-group">
                                                                                <span className="input-group-text align-items-start"> 予備</span>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="平成20年10月14日"
                                                                                    name='other'
                                                                                    value={wills.estate.cert_info.mort_info[index].other}
                                                                                    onChange={(e) => {onChangeEstateCertInput(e, index)}}
                                                                                />
                                                                            </div>
                                                                            <div className="d-flex justify-content-end mb-2">
                                                                                <button type="button" class="btn btn-dark" onClick={removeEstateCertInfo}>削除</button>
                                                                            </div>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            ))
                                                        }
                                                    </Accordion>
                                                }
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">日付</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="00000000000000000000"
                                                        name='date'
                                                        value={wills.estate.land.date}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <span className="input-group-text align-items-start">登記事項証明書</span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="00000000000000000000"
                                                        name='serial'
                                                        value={wills.estate.land.serial}
                                                        onChange={onChangeEstateLandInput}
                                                    />
                                                </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <div className="d-flex flex-row-reverse mt-5">
                                                <button className="btn btn-primary" type="button" onClick={() => handleUpdateWill(2)}>Pdf 生成</button>
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
