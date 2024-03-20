import './css/Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import SnsLogin from '../../components/widgets/SnsLogin';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// * 회원가입
const Signup = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleIsAllCheck = () => {
    setIsAllChecked(prevState => !prevState);
  };

  const navigate = useNavigate();

  const [emailLocal, setEmailLocal] = useState('');
  const [domain, setDomain] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  // 이메일 로컬 파트 변경 핸들러
  const onEmailLocalChange = e => {
    setEmailLocal(e.target.value);
  };

  // 도메인 변경 핸들러
  const onDomainChange = e => {
    setDomain(e.target.value);
  };

  // 기타 사용자 입력 처리
  const onRegistChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onRegist = e => {
    const registData = {
      email: `${emailLocal}@${domain}`,
      password: user.password,
      nickname: user.nickname,
      agree_marketing: 1,
      agree_promotion: 1,
    };
    axios
      .post('http://localhost:3005/api/users/register', registData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <main className='signup'>
      <header>
        <h1>회원가입</h1>
      </header>
      <SnsLogin text='SNS 계정으로 간편하게 회원 가입' />

      {/* //* 회원 가입 입력 폼 */}
      <form onSubmit={onRegist}>
        <Input
          label='이메일'
          id='email'
          value={emailLocal}
          placeholder='이메일'
          onChange={onEmailLocalChange}
        >
          <span>@</span>
          <select name='domain' onChange={onDomainChange}>
            <option value=''>직접 입력</option>
            <option value='naver.com'>naver.com</option>
            <option value='kakao.com'>kakao.com</option>
          </select>
          <Button>이메일 인증하기</Button>
        </Input>

        <Input
          type='password'
          label='비밀번호'
          placeholder='비밀번호'
          description='영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.'
          name='password'
          value={user.password}
          onChange={onRegistChange}
        />
        <Input
          type='password'
          label='비밀번호 확인'
          placeholder='비밀번호 확인'
          name='passwordConfirm'
          value={user.passwordConfirm}
          onChange={onRegistChange}
        />
        <Input
          label='닉네임'
          placeholder='별명 (2~20자)'
          description='다른 유저와 겹치지 않도록 입력해주세요.(2~20자)'
          name='nickname'
          value={user.nickname}
          onChange={onRegistChange}
        />

        {/* // Todo 체크박스 스타일링 및 전체 선택 기능 */}
        <section className='agree-section'>
          <div className='agree__chackbox'>
            <input
              type='checkbox'
              id='agree_all'
              name='agree_all'
              onClick={handleIsAllCheck}
            />
            <label htmlFor='agree_all'>
              <strong>전체 동의</strong> <span>선택항목에 대한 동의 포함</span>
            </label>
          </div>
          <hr />

          <div className='agree__chackbox'>
            <input
              type='checkbox'
              id='agree_age'
              name='agree_age'
              checked={isAllChecked}
            />
            <label htmlFor='agree_age'>
              만14세이상입니다 <span>(필수)</span>
            </label>
          </div>

          <div className='agree__chackbox'>
            <input
              type='checkbox'
              id='agree_promotion'
              name='agree_promotion'
              checked={isAllChecked}
            />
            <label htmlFor='agree_promotion'>
              개인정보수집 및 이용 동의 <span>(필수)</span>
            </label>
          </div>
          <div className='agree__chackbox'>
            <input
              type='checkbox'
              id='agree_marketing'
              name='agree_marketing'
              checked={isAllChecked}
            />

            <label htmlFor='agree_marketing'>
              마케팅 정보 수신 동의 <span>(선택)</span>
            </label>
          </div>
        </section>

        {/* //* reCAPTCHA */}
        <Button type='submit'>회원가입하기</Button>
      </form>
      <p>
        이미 아이디가 있으신가요? <Link to='/login'>로그인</Link>
      </p>
    </main>
  );
};

export default Signup;
