"use strict";(self.webpackChunktaskpro_project=self.webpackChunktaskpro_project||[]).push([[909],{8681:(e,a,s)=>{s.d(a,{A:()=>l});s(5043);var r=s(6580);const n="AuthLinks_linksContainer__7+rrD",t="AuthLinks_link__S8Lge",i="AuthLinks_active__opWK-";var o=s(579);const l=()=>{const e=(0,r.zy)();return(0,o.jsxs)("div",{className:n,children:[(0,o.jsx)(r.N_,{to:"/register",className:"".concat(t," ").concat("/register"===e.pathname?i:""),children:"Register"}),(0,o.jsx)(r.N_,{to:"/login",className:"".concat(t," ").concat("/login"===e.pathname?i:""),children:"Login"})]})}},6909:(e,a,s)=>{s.r(a),s.d(a,{default:()=>f});var r=s(9379),n=s(5043),t=s(7521),i=s(8681),o=s(3902),l=s(2546),c=s(6);const u={form:"LoginPage_form__5NvfP",input:"LoginPage_input__ERXCp",button:"LoginPage_button__hBMWR"};var d=s(3003),p=s(6580),m=s(5769),h=s(8611),g=s.n(h),_=s(579);const f=()=>{const e=(0,d.wA)(),a=(0,p.Zp)(),[s,h]=(0,n.useState)({email:"",password:""}),[f,x]=(0,n.useState)(!1),[L,w]=(0,n.useState)(""),j=e=>{const{name:a,value:n}=e.target;h((0,r.A)((0,r.A)({},s),{},{[a]:n}))};return(0,_.jsxs)(t.A,{children:[(0,_.jsx)(i.A,{}),(0,_.jsxs)("form",{className:u.form,onSubmit:async r=>{if(r.preventDefault(),s.email.trim()?s.password.trim()?(w(""),1):(w("Password is required."),0):(w("Email is required."),0)){x(!0);try{const r=await e((0,m.Lx)(s)).unwrap();return g().Notify.success("Login successful!"),a("/dashboard"),r}catch(L){g().Notify.failure("Login failed. Please check your credentials and try again."),w("Invalid email or password."),console.error("Login failed:",L)}finally{x(!1)}}},children:[L&&(0,_.jsx)("p",{className:u.error,children:L}),(0,_.jsx)(o.A,{type:"email",placeholder:"Enter your email",name:"email",value:s.email,handleChange:j,extraClass:u.input}),(0,_.jsx)(l.A,{placeholder:"Enter your password",name:"password",value:s.password,handleChange:j,extraClass:u.input}),(0,_.jsx)(c.A,{type:"submit",disabled:f,extraClass:u.button,children:f?"Logging in...":"Log In Now"})]})]})}}}]);
//# sourceMappingURL=909.660bb80d.chunk.js.map