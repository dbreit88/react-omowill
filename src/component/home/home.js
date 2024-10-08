import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ConfigContext } from "../../context/ConfigProvider";
import axios from 'axios';

import Spinner from '../includes/spinner';

// import { toast } from 'react-toastify';
import logo from "../../assets/img/logo-pb.webp";
// import logo1 from "../../assets/img/logo1.webp";

import Ability from '../ability/ability';
import SamplePDF from '../../assets/samplepdf/sample.pdf';

import './home.css';
import GoTopPage from '../includes/goTopPage';
import { toast } from 'react-toastify';

function Home() {
    const { changeTabIdx } = useContext(ConfigContext);

    const navigate = useNavigate();
    const [spinnerFlg, setSpinnerFlg] = useState(false);

    const [infoData, setInfo] = useState([]);

    const [mobileFlg, setMobileFlg] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 576) {
            setMobileFlg(true)
        } else {
            setMobileFlg(false);
        }
    };

    useEffect(() => {
        handleResize();

        const getInfo = async () => {
            setSpinnerFlg(true);
            try {
                var endpoint = '/getInfo';
                const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, {});

                setInfo(response.data);
            } catch (error) {
                toast.error('ネットワーク接続を確認してください。');
            } finally {
                setSpinnerFlg(false);
            }
        };

        getInfo();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const gotoRegister = () => {
        navigate("/register");
    }

    const gotoURL = (str) => {
        navigate(str);
    }

    const resetDate = (value) => {
        if (value < 10) {
            return '0' + value
        } else {
            return value
        }
    }

    const switchTab = (tabIndx) => {
        changeTabIdx(tabIndx);
    }

    return (
        <div className='position-relative'>
            <div className='reason-container w-100 d-flex'>
                <div className='col-sm-12 col-md-12 col-lg-1'></div>
                <div className='col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center align-items-center reason-content'>
                    <div className='d-flex justify-content-between flex-column home-intro'>
                        <h3 className='mb-4'>震災/津波/災害/戦争</h3>
                        <h5>
                            家族との旅行写真、友人からの温かい手紙、子供たちの成長記録など、これらの品々は私たちの心の宝物でした。これらの思い出は、日常の中で私たちに笑顔をもたらし、時には励ましの力を与えてくれるものでした。それが一瞬にして失われてしまったことは、言葉にできないほどの喪失感をもたらしました。
                        </h5>

                        <h3 className='en mt-5'><img src={logo} className="font-logo" alt="font-logo"/></h3>
                        <h5>想いを「今」WEB上に残しておく</h5>
                        <div>
                            <button className='btn btn-primary w-fit-content' onClick={gotoRegister}><i className='fa fa-user-plus'></i>&nbsp;&nbsp;&nbsp;ご利用登録</button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-7 reason-right-content'>
                    <img src='/assets/img/home.webp' alt='img' className='w-100' />
                </div>
            </div>

            <div className='ability-container'>
                <div className='home-intro home-ability'>
                    <div className='d-flex justify-content-center ability-header-title'>
                        <h3 className='en'><img src={logo} className="font-logo"  alt="font-logo"/></h3>
                        <h3>でできること</h3>
                    </div>
                    <h6 className='en text-center fw-bold'>Ability</h6>
                    {
                        mobileFlg ? (
                            <h5 className='text-left ability-des'>
                                想い出を未来に繋げるために。
                                大切な記憶を守ります。
                                いつでも、どこでも、大切なメッセージを届けます。
                                人生の重要な瞬間を、永遠に残すために。</h5>
                        ) : (<h5 className='text-center ability-des'>
                            想い出を未来に繋げるために。<br />
                            大切な記憶を守ります。<br />
                            いつでも、どこでも、大切なメッセージを届けます。<br />
                            人生の重要な瞬間を、永遠に残すために。</h5>)
                    }

                </div>

                <Ability />

                <div className='sample-pattens-row container'>
                    <div className="w-100">
                        <div className="w-100 d-flex mt-3">
                            <div className="w-100 border pt-4 pb-4 cursor-pointer">
                                <h4 className='fw-bold m-0'>臨終および出生時のサンプル</h4>
                            </div>
                        </div>

                        <ul className="nav nav-tabs nav-justified">
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="tab" href="#home"><h5 className='fw-bold m-0'>動画見本</h5></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-bs-toggle="tab" href="#menu1"><h5 className='fw-bold m-0'>PDF見本</h5></a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane container active" id="home">
                                <div className="d-flex pt-3 pb-3">
                                    <div className="sample-video">
                                        <Link to="https://www.youtube.com/watch?v=5diW7cfXyHg" target='_blank' rel='noopener noreferrer'>
                                            <img src="/assets/img/sample-die-video.webp" className="w-100" alt='' />
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center sample-desc">
                                        <div className="text-start w-75">
                                            <h5 className="fw-bold">「亡くなった時」動画メッセージ</h5>
                                            <h6 className="mt-3">
                                                動画投稿サービスであるYouTubeを活用して・動画で大切な人にメッセージを残します。
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane container fade" id="menu1">
                                <div className="d-flex justify-content-center align-items-center sample-desc">
                                    <div className='view-pdf-row'>
                                        <button className='btn btn-primary view-pdf-btn'><Link to={SamplePDF} target='_blank' rel='noopener noreferrer'>PDF見本</Link></button>
                                    </div>
                                    <h6 className="mt-3">
                                        あなたへ
                                        <br /><br /><br />
                                        もしあなたがこれを読んでいるなら、もう私はあなたのそばにいないということになります。だけど、どうか私のあなたへの愛は永遠に変わらないということを信じてください。
                                        <br /><br />
                                        振り返ると、心は一緒に過ごしたかけがえのない思い出で溢れかえります。初めて出会ったあの時を覚えていますか？
                                        <br /><br />
                                        あなたの弾けるような笑い声と、あなたの誠実な優しさがあの経験を本当に忘れられないものにしてくれました。世界が輝きを増し、私の心は少し速く鼓動し、あなたのことばかり考えて笑顔が止まりませんでした。
                                        <br /><br />
                                        あなたの人生に私がいたことを心から感謝しています。あなたはいつも私の支えであり、力強い存在でした。あなたの揺るぎない忠誠心は、どんなことがあっても私のことを気にかけてくれる、という安心感と愛を与えてくれました。
                                        <br /><br />
                                        今はきっと辛い時間でしょうが、どうか安らぎと平和を見つけてください。一緒に過ごしたすべての笑い声と愛を思い出してください。私たちが一緒に過ごした時間はかけがえのないものでした。
                                        <br /><br />
                                        これから先、私のいないことであなたの光が消えないようにしてください。これからも全力で人生を謳歌し、夢を追いかけ、そして私たちが作った美しい思い出をずっと大切にしてください。
                                        <br /><br /><br />
                                        永遠の愛を込めて
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container ability-container price-container'>
                <div className='home-intro home-ability'>
                    <div className='d-flex justify-content-center'>
                        <h3>動画や手紙の閲覧について</h3>
                    </div>
                    <h5 className="way_learning_detail">動画やメッセージの閲覧方法は、以下の2つの方法にて可能です。</h5>
                </div>

                <div className='d-flex w-100 ability-card-content'>
                    <div className='border d-flex w-100 w-md-50 flex-column  card-content'>
                        <h6 className='en en-card-title'>Free</h6>
                        <h1 className='card-number'>01</h1>

                        <h4 className='fw-bold'>PDFの発行</h4>
                        <h5 className='fw-bold'>「亡くなった時」 「生誕時」のメッセージどちらも動画または手紙の登録時にログインID・PASSの記載されたPDFを発行</h5>
                        <h6>そちらをメールなどで・ご家族やご遺族に分かるように保管・取り置いて・サイトよりマイページで閲覧可能です。</h6><br />

                        <div className='d-flex justify-content-between align-items-center gap-3 card-bottom'>
                            <Link to="/service" onClick={() => switchTab(2)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                            <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL('/register')}>無料</button>
                        </div>
                    </div>
                    <div className='border d-flex w-100 w-md-50 flex-column  card-content'>
                        <h6 className='en en-card-title'>Charge</h6>
                        <h1 className='card-number'>02</h1>

                        <h4 className='fw-bold'>ご家族やご遺族からの閲覧申請</h4>

                        <h5 className='fw-bold'>動画や手紙があるが・ログイン情報が不明などの場合ご家族やご遺族からの閲覧申請が可能</h5>

                        <h6>まず・動画や手紙が存在するか・確認の申請 (無料) を行い存在した場合には・閲覧の申請手続きができます。ご家族やご遺族書類の提出を頂き・書類確認の等のための事務手数料 (550円税込)を頂戴いたします。</h6>

                        <div className='d-flex align-items-center gap-3 card-bottom justify-content-between'>
                            <Link to="/service" onClick={() => switchTab(3)} className='ability-detail-link'><i className="fa fa-caret-right" aria-hidden="true" />&nbsp;&nbsp;詳細情報</Link>
                            <button className='btn btn-primary bg-primary text-white' onClick={() => gotoURL('/reqview')}>閲覧申請</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-secondary info-container'>
                <div className='info-title-container'>
                    <h3 className='fw-bold'>お知らせ</h3>
                    <h6 className='en'>Information</h6>
                </div>

                <div className='container info-content'>
                    <div className='d-flex gap-5'>
                        <ul className="list-group list-group-flush w-100">
                            {
                                infoData === 'no data' ? (
                                    <div className="info-list-content d-flex flex-column">
                                        <div className="info-content-header text-center">
                                            <h4>データが存在しません</h4>
                                        </div>
                                    </div>
                                ) : (
                                    infoData.map((item, index) => (
                                        <Link to="/info" className="list-group-item" key={index}>
                                            <div className='d-flex info-flex'>
                                                <div className='info-date-area'>
                                                    <dt className='info-date number'><span className='info-year'>{new Date(item.date).getFullYear()}</span>{resetDate(new Date(item.date).getMonth() + 1)}.{resetDate(new Date(item.date).getDate())}</dt>
                                                </div>
                                                <div className='flex-grow-1 pl-1'>
                                                    <div className='justify-content-between d-flex'>
                                                        <div style={{ textAlign: 'left' }} className='pr-2'>
                                                            <h5 className='mb-0 fw-bold info--detail-title'>{item.title}</h5>
                                                            <h6 className='info-detail-subTitle'>{item.subTitle}</h6>
                                                        </div>
                                                        <div>
                                                            <img src='/assets/img/right-arrow-white.png' alt='img' className='arrow-btn cursor-pointer m-0' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {
                spinnerFlg && <Spinner />
            }
            <GoTopPage />
        </div>
    )
}

export default Home;