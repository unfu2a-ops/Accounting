import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  LayoutDashboard, FileText, Receipt, Users, Package, Landmark, WalletCards,
  BarChart3, Settings, Search, Bell, Plus, ArrowUpLeft, ArrowDownLeft,
  TrendingUp, TrendingDown, MoreHorizontal, ChevronLeft, Menu, X, Sun, Moon,
  Download, Filter, Eye, Edit3, Trash2, CheckCircle2, Clock3, AlertCircle,
  Building2, CreditCard, Banknote, ShoppingCart, Truck, Scale, BookOpen,
  ClipboardList, UserRound, LogOut, ShieldCheck, Calculator, CircleDollarSign
} from "lucide-react";
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from "recharts";
import "./styles.css";

const money = n => new Intl.NumberFormat("fa-IR").format(n) + " تومان";
const num = n => new Intl.NumberFormat("fa-IR").format(n);

const initialCustomers = [
  {id:"C-1001", name:"شرکت آریا تجارت", type:"مشتری", phone:"021-88771234", balance: 184500000, status:"فعال"},
  {id:"C-1002", name:"فروشگاه پارس", type:"مشتری", phone:"021-66450112", balance: 72300000, status:"فعال"},
  {id:"S-2001", name:"پارس تأمین کالا", type:"تأمین‌کننده", phone:"021-44320198", balance: -96000000, status:"فعال"},
  {id:"S-2002", name:"صنایع بسته‌بندی نوین", type:"تأمین‌کننده", phone:"021-55082341", balance: -31500000, status:"غیرفعال"}
];

const invoices = [
  {id:"INV-1405-00128", party:"شرکت آریا تجارت", date:"۱۴۰۵/۰۷/۱۵", due:"۱۴۰۵/۰۸/۱۵", amount:248000000, status:"پرداخت نشده"},
  {id:"INV-1405-00127", party:"فروشگاه پارس", date:"۱۴۰۵/۰۷/۱۳", due:"۱۴۰۵/۰۸/۱۳", amount:97200000, status:"نیمه پرداخت"},
  {id:"INV-1405-00126", party:"مجموعه هیراد", date:"۱۴۰۵/۰۷/۱۰", due:"۱۴۰۵/۰۸/۱۰", amount:156500000, status:"پرداخت شده"},
  {id:"INV-1405-00125", party:"بازرگانی سپهر", date:"۱۴۰۵/۰۷/۰۷", due:"۱۴۰۵/۰۸/۰۷", amount:68400000, status:"پرداخت شده"}
];

const journal = [
  {no:"J-000842", date:"۱۴۰۵/۰۷/۱۵", desc:"فروش کالا به شرکت آریا تجارت", debit:248000000, credit:248000000, state:"قطعی"},
  {no:"J-000841", date:"۱۴۰۵/۰۷/۱۵", desc:"پرداخت هزینه حمل و نقل", debit:18500000, credit:18500000, state:"قطعی"},
  {no:"J-000840", date:"۱۴۰۵/۰۷/۱۴", desc:"خرید مواد اولیه", debit:92000000, credit:92000000, state:"قطعی"},
  {no:"J-000839", date:"۱۴۰۵/۰۷/۱۴", desc:"دریافت از مشتری", debit:125000000, credit:125000000, state:"قطعی"},
  {no:"J-000838", date:"۱۴۰۵/۰۷/۱۳", desc:"ثبت سند افتتاحیه بانک", debit:500000000, credit:500000000, state:"قطعی"}
];

const monthly = [
  {name:"فروردین", sales:410, expenses:240},
  {name:"اردیبهشت", sales:520, expenses:275},
  {name:"خرداد", sales:610, expenses:310},
  {name:"تیر", sales:580, expenses:295},
  {name:"مرداد", sales:730, expenses:355},
  {name:"شهریور", sales:680, expenses:340},
  {name:"مهر", sales:820, expenses:390}
];

const accounts = [
  {code:"10101", name:"صندوق", group:"دارایی جاری", balance:82500000},
  {code:"10102", name:"بانک ملت", group:"دارایی جاری", balance:1245000000},
  {code:"10301", name:"حساب‌های دریافتنی", group:"دارایی جاری", balance:311800000},
  {code:"10401", name:"موجودی کالا", group:"دارایی جاری", balance:486000000},
  {code:"20101", name:"حساب‌های پرداختنی", group:"بدهی جاری", balance:-127500000},
  {code:"30101", name:"سرمایه", group:"حقوق مالکانه", balance:-1800000000},
  {code:"40101", name:"فروش کالا", group:"درآمد", balance:-1152000000},
  {code:"50101", name:"بهای تمام‌شده", group:"هزینه", balance:642000000}
];

function App(){
  const [page,setPage] = useState("dashboard");
  const [dark,setDark] = useState(false);
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState("");
  const [customers,setCustomers] = useState(initialCustomers);
  const [modal,setModal] = useState(null);

  const nav = [
    {id:"dashboard", label:"داشبورد", icon:LayoutDashboard},
    {id:"journal", label:"اسناد حسابداری", icon:FileText},
    {id:"invoices", label:"فاکتورها", icon:Receipt},
    {id:"customers", label:"اشخاص و طرف حساب", icon:Users},
    {id:"products", label:"کالا و انبار", icon:Package},
    {id:"cash", label:"دریافت و پرداخت", icon:WalletCards},
    {id:"accounts", label:"حساب‌ها", icon:Landmark},
    {id:"reports", label:"گزارش‌های مالی", icon:BarChart3},
  ];

  const filteredCustomers = useMemo(()=>customers.filter(c => 
    `${c.name} ${c.id} ${c.phone}`.toLowerCase().includes(query.toLowerCase())
  ),[customers,query]);

  const addCustomer = e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id:"C-"+Math.floor(1000+Math.random()*8999),
      name:f.get("name"), type:f.get("type"), phone:f.get("phone"),
      balance:0, status:"فعال"
    };
    setCustomers(v=>[item,...v]);
    setModal(null);
  };

  return <div className={dark ? "app dark" : "app"}>
    <aside className={open ? "sidebar open" : "sidebar"}>
      <div className="brand">
        <div className="brand-icon"><Calculator size={23}/></div>
        <div><strong>حساب‌یار</strong><span>Professional ERP</span></div>
        <button className="mobile-close" onClick={()=>setOpen(false)}><X/></button>
      </div>
      <div className="workspace">
        <div className="workspace-logo"><Building2 size={20}/></div>
        <div><b>شرکت پیشرو تجارت</b><small>سال مالی ۱۴۰۵</small></div>
        <ChevronLeft size={17}/>
      </div>
      <nav>
        <div className="nav-label">منوی اصلی</div>
        {nav.map(n=>{const Icon=n.icon; return <button key={n.id} className={page===n.id?"nav-item active":"nav-item"} onClick={()=>{setPage(n.id);setOpen(false)}}><Icon size={19}/><span>{n.label}</span>{n.id==="invoices"&&<em>4</em>}</button>})}
        <div className="nav-label second">مدیریت</div>
        <button className="nav-item"><ShieldCheck size={19}/><span>کاربران و دسترسی</span></button>
        <button className="nav-item"><Settings size={19}/><span>تنظیمات</span></button>
      </nav>
      <div className="sidebar-footer"><div className="avatar">م</div><div><b>مدیر سیستم</b><small>دسترسی کامل</small></div><LogOut size={17}/></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="menu-btn" onClick={()=>setOpen(true)}><Menu/></button>
        <div className="breadcrumb"><span>حسابداری</span><ChevronLeft size={15}/><b>{nav.find(x=>x.id===page)?.label || "داشبورد"}</b></div>
        <div className="top-actions">
          <div className="search"><Search size={17}/><input placeholder="جستجو..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>
          <button className="icon-btn" onClick={()=>setDark(!dark)}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button>
          <button className="icon-btn notify"><Bell size={19}/><i/></button>
          <div className="top-user"><div className="avatar">م</div><span>مدیر سیستم</span></div>
        </div>
      </header>

      <div className="content">
        {page==="dashboard" && <Dashboard onAdd={()=>setModal("invoice")} />}
        {page==="journal" && <Journal onAdd={()=>setModal("journal")} />}
        {page==="invoices" && <Invoices onAdd={()=>setModal("invoice")} />}
        {page==="customers" && <Customers customers={filteredCustomers} onAdd={()=>setModal("customer")} />}
        {page==="products" && <Products/>}
        {page==="cash" && <Cash/>}
        {page==="accounts" && <Accounts/>}
        {page==="reports" && <Reports/>}
      </div>
    </main>

    {modal==="customer" && <Modal title="افزودن طرف حساب" close={()=>setModal(null)}>
      <form className="form" onSubmit={addCustomer}>
        <label>نام / عنوان<input name="name" required placeholder="مثلاً شرکت نمونه ایرانیان"/></label>
        <label>نوع<select name="type"><option>مشتری</option><option>تأمین‌کننده</option><option>سایر</option></select></label>
        <label>شماره تماس<input name="phone" placeholder="021-12345678"/></label>
        <div className="form-actions"><button type="button" className="btn ghost" onClick={()=>setModal(null)}>انصراف</button><button className="btn primary">ذخیره طرف حساب</button></div>
      </form>
    </Modal>}
    {modal==="invoice" && <Modal title="فاکتور فروش جدید" close={()=>setModal(null)}><InvoiceForm close={()=>setModal(null)}/></Modal>}
    {modal==="journal" && <Modal title="ثبت سند حسابداری" close={()=>setModal(null)}><JournalForm close={()=>setModal(null)}/></Modal>}
  </div>
}

function Header({title,subtitle,action,actionText="افزودن"}){return <div className="page-head"><div><h1>{title}</h1><p>{subtitle}</p></div>{action&&<button className="btn primary" onClick={action}><Plus size={18}/>{actionText}</button>}</div>}

function Dashboard({onAdd}){
  return <>
    <Header title="داشبورد مالی" subtitle="خلاصه وضعیت مالی کسب‌وکار در سال مالی ۱۴۰۵" action={onAdd} actionText="فاکتور جدید"/>
    <div className="stats">
      <Stat icon={CircleDollarSign} title="فروش خالص" value="۱,۱۵۲,۰۰۰,۰۰۰" change="+۱۲.۸٪" positive/>
      <Stat icon={TrendingUp} title="سود خالص" value="۳۸۷,۶۰۰,۰۰۰" change="+۸.۴٪" positive/>
      <Stat icon={ArrowDownLeft} title="مطالبات" value="۳۱۱,۸۰۰,۰۰۰" change="۲۴ فاکتور" />
      <Stat icon={ArrowUpLeft} title="بدهی‌ها" value="۱۲۷,۵۰۰,۰۰۰" change="۹ سررسید" danger/>
    </div>
    <div className="grid two">
      <section className="card chart-card">
        <div className="card-head"><div><h3>روند فروش و هزینه</h3><span>مبالغ به میلیون تومان</span></div><button className="filter-btn"><Filter size={15}/> این ۷ ماه</button></div>
        <div className="chart"><ResponsiveContainer width="100%" height={300}><LineChart data={monthly}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="sales" stroke="currentColor" strokeWidth={3} dot={false} name="فروش"/><Line type="monotone" dataKey="expenses" stroke="currentColor" strokeOpacity=".3" strokeWidth={3} dot={false} name="هزینه"/></LineChart></ResponsiveContainer></div>
      </section>
      <section className="card">
        <div className="card-head"><div><h3>ترکیب درآمد</h3><span>تفکیک فروش بر اساس گروه</span></div></div>
        <div className="pie-wrap"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={[{n:"کالای اصلی",v:62},{n:"خدمات",v:23},{n:"سایر",v:15}]} dataKey="v" nameKey="n" innerRadius={65} outerRadius={90} paddingAngle={4}>{[1,2,3].map((x,i)=><Cell key={i} fill={["#0f766e","#2563eb","#94a3b8"][i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="legend"><span><i className="c1"/>کالای اصلی <b>۶۲٪</b></span><span><i className="c2"/>خدمات <b>۲۳٪</b></span><span><i className="c3"/>سایر <b>۱۵٪</b></span></div></div>
      </section>
    </div>
    <div className="grid two lower">
      <section className="card table-card">
        <div className="card-head"><div><h3>آخرین اسناد</h3><span>آخرین فعالیت‌های حسابداری</span></div><button className="link-btn">مشاهده همه <ChevronLeft size={15}/></button></div>
        <table><thead><tr><th>شماره</th><th>شرح</th><th>مبلغ</th><th>وضعیت</th></tr></thead><tbody>{journal.slice(0,4).map(x=><tr key={x.no}><td className="mono">{x.no}</td><td>{x.desc}</td><td>{money(x.debit)}</td><td><Badge text={x.state}/></td></tr>)}</tbody></table>
      </section>
      <section className="card alerts"><div className="card-head"><div><h3>نیازمند توجه</h3><span>موارد مهم مالی</span></div></div>
        <Alert icon={AlertCircle} title="۳ فاکتور سررسید شده" text="به مبلغ ۱۸۴,۵۰۰,۰۰۰ تومان"/>
        <Alert icon={Clock3} title="۲ سند در انتظار تأیید" text="نیازمند بررسی مدیر مالی"/>
        <Alert icon={CheckCircle2} title="تطبیق بانکی انجام شد" text="آخرین بروزرسانی: امروز ۱۴:۳۲" ok/>
      </section>
    </div>
  </>
}

function Stat({icon:Icon,title,value,change,positive,danger}){return <div className="stat"><div className="stat-top"><div className="stat-icon"><Icon size={20}/></div><span className={positive?"up":danger?"down":""}>{change}</span></div><small>{title}</small><strong>{value} <i>تومان</i></strong><div className="spark"><span style={{width: positive?"78%":danger?"42%":"58%"}}/></div></div>}
function Badge({text}){return <span className={"badge "+(text==="قطعی"||text==="فعال"||text==="پرداخت شده"?"green":text==="نیمه پرداخت"?"orange":text==="غیرفعال"?"gray":"red")}>{text}</span>}
function Alert({icon:Icon,title,text,ok}){return <div className="alert-row"><div className={ok?"alert-icon ok":"alert-icon"}><Icon size={18}/></div><div><b>{title}</b><small>{text}</small></div><ChevronLeft size={15}/></div>}

function Journal({onAdd}){return <><Header title="اسناد حسابداری" subtitle="ثبت، بررسی و مدیریت اسناد دوطرفه" action={onAdd} actionText="ثبت سند جدید"/><Toolbar placeholder="جستجو در شماره یا شرح سند"/><section className="card table-card"><TableTop title="دفتر روزنامه" count="۸۴۲ سند"/><table><thead><tr><th>شماره سند</th><th>تاریخ</th><th>شرح</th><th>بدهکار</th><th>بستانکار</th><th>وضعیت</th><th/></tr></thead><tbody>{journal.map(x=><tr key={x.no}><td className="mono">{x.no}</td><td>{x.date}</td><td>{x.desc}</td><td>{money(x.debit)}</td><td>{money(x.credit)}</td><td><Badge text={x.state}/></td><td><button className="row-action"><Eye size={16}/></button></td></tr>)}</tbody></table><Pagination/></section></>}
function Invoices({onAdd}){return <><Header title="فاکتورها" subtitle="مدیریت فروش، خرید و وضعیت تسویه" action={onAdd} actionText="فاکتور فروش"/><div className="stats compact"><Stat icon={Receipt} title="فروش این ماه" value="۴۸۶,۲۰۰,۰۰۰" change="+۱۴٪" positive/><Stat icon={Clock3} title="در انتظار وصول" value="۳۱۱,۸۰۰,۰۰۰" change="۲۴ فاکتور"/><Stat icon={CheckCircle2} title="تسویه شده" value="۷۴۲,۳۰۰,۰۰۰" change="۸۶ فاکتور" positive/></div><section className="card table-card"><TableTop title="لیست فاکتورها" count="۱۲۸ فاکتور"/><table><thead><tr><th>شماره</th><th>طرف حساب</th><th>تاریخ</th><th>سررسید</th><th>مبلغ</th><th>وضعیت</th><th/></tr></thead><tbody>{invoices.map(x=><tr key={x.id}><td className="mono">{x.id}</td><td><b>{x.party}</b></td><td>{x.date}</td><td>{x.due}</td><td>{money(x.amount)}</td><td><Badge text={x.status}/></td><td><button className="row-action"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table><Pagination/></section></>}
function Customers({customers,onAdd}){return <><Header title="اشخاص و طرف حساب" subtitle="مدیریت مشتریان، تأمین‌کنندگان و حساب‌های مرتبط" action={onAdd} actionText="طرف حساب جدید"/><section className="card table-card"><TableTop title="طرف حساب‌ها" count={`${customers.length} مورد`}/><table><thead><tr><th>کد</th><th>نام / عنوان</th><th>نوع</th><th>تلفن</th><th>مانده حساب</th><th>وضعیت</th><th/></tr></thead><tbody>{customers.map(x=><tr key={x.id}><td className="mono">{x.id}</td><td><div className="person"><div>{x.name[0]}</div><b>{x.name}</b></div></td><td>{x.type}</td><td>{x.phone}</td><td className={x.balance<0?"negative":"positive"}>{money(Math.abs(x.balance))}</td><td><Badge text={x.status}/></td><td><button className="row-action"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></section></>}
function Products(){return <><Header title="کالا و انبار" subtitle="کنترل موجودی، قیمت و گردش کالا" action={()=>alert("فرم کالای جدید در نسخه بعدی فعال می‌شود")} actionText="کالای جدید"/><div className="stats compact"><Stat icon={Package} title="ارزش موجودی" value="۴۸۶,۰۰۰,۰۰۰" change="۱۲۵ قلم"/><Stat icon={ShoppingCart} title="موجودی کم" value="۸ قلم" change="نیازمند سفارش" danger/><Stat icon={Truck} title="ورودی ماه" value="۲۸۴,۰۰۰,۰۰۰" change="+۱۱٪" positive/></div><section className="card table-card"><TableTop title="موجودی کالا" count="۱۲۵ قلم"/><table><thead><tr><th>کد کالا</th><th>نام کالا</th><th>گروه</th><th>موجودی</th><th>قیمت فروش</th><th>وضعیت</th></tr></thead><tbody>{[["P-1001","لپ‌تاپ اداری Pro 15","کالای دیجیتال",42,48500000,"موجود"],["P-1002","مانیتور 24 اینچ","کالای دیجیتال",18,12700000,"موجود"],["P-1003","پرینتر لیزری","تجهیزات اداری",7,28900000,"کمبود"],["P-1004","کاغذ A4 بسته ۵۰۰ برگ","مصرفی",120,690000,"موجود"]].map(x=><tr key={x[0]}><td className="mono">{x[0]}</td><td><b>{x[1]}</b></td><td>{x[2]}</td><td>{num(x[3])}</td><td>{money(x[4])}</td><td><Badge text={x[5]}/></td></tr>)}</tbody></table></section></>}
function Cash(){return <><Header title="دریافت و پرداخت" subtitle="صندوق، بانک و عملیات نقدی"/><div className="cash-grid"><div className="cash-card"><div className="cash-icon"><Banknote/></div><small>صندوق اصلی</small><b>{money(82500000)}</b><span>آخرین بروزرسانی امروز</span></div><div className="cash-card"><div className="cash-icon"><Landmark/></div><small>بانک ملت</small><b>{money(1245000000)}</b><span>حساب شماره ۰۱۲۳۴۵۶۷۸۹</span></div><div className="cash-card"><div className="cash-icon"><CreditCard/></div><small>کارتخوان</small><b>{money(38600000)}</b><span>تسویه روزانه فعال</span></div></div><section className="card table-card"><TableTop title="گردش اخیر" count="امروز"/><table><thead><tr><th>شرح</th><th>نوع</th><th>تاریخ</th><th>مبلغ</th></tr></thead><tbody>{[["دریافت از شرکت آریا تجارت","دریافت","۱۴۰۵/۰۷/۱۵",125000000],["پرداخت به پارس تأمین کالا","پرداخت","۱۴۰۵/۰۷/۱۵",74000000],["واریز به بانک ملت","انتقال","۱۴۰۵/۰۷/۱۴",180000000],["دریافت کارتخوان","دریافت","۱۴۰۵/۰۷/۱۴",38500000]].map((x,i)=><tr key={i}><td><b>{x[0]}</b></td><td><Badge text={x[1]}/></td><td>{x[2]}</td><td>{money(x[3])}</td></tr>)}</tbody></table></section></>}
function Accounts(){return <><Header title="درخت حساب‌ها" subtitle="کدینگ حسابداری و مانده حساب‌ها" action={()=>alert("افزودن حساب در نسخه بعدی فعال می‌شود")} actionText="حساب جدید"/><section className="card table-card"><TableTop title="سرفصل حساب‌ها" count="۳۴ حساب"/><table><thead><tr><th>کد</th><th>عنوان حساب</th><th>گروه</th><th>مانده</th><th/></tr></thead><tbody>{accounts.map(x=><tr key={x.code}><td className="mono">{x.code}</td><td><div className="account"><Landmark size={17}/><b>{x.name}</b></div></td><td>{x.group}</td><td className={x.balance<0?"negative":"positive"}>{money(Math.abs(x.balance))}</td><td><button className="row-action"><Eye size={16}/></button></td></tr>)}</tbody></table></section></>}
function Reports(){return <><Header title="گزارش‌های مالی" subtitle="گزارش‌های استاندارد و مدیریتی"/><div className="report-grid">{[["سود و زیان","تحلیل درآمد، هزینه و سود خالص",TrendingUp],["ترازنامه","دارایی، بدهی و حقوق مالکانه",Scale],["تراز آزمایشی","مانده بدهکار و بستانکار حساب‌ها",BookOpen],["دفتر کل","گردش تفصیلی حساب‌ها",ClipboardList],["گردش طرف حساب","ریز معاملات مشتریان و تأمین‌کنندگان",UserRound],["گزارش فروش","تحلیل فروش بر اساس کالا و مشتری",BarChart3]].map(([a,b,I])=><div className="report-card" key={a}><div className="report-icon"><I/></div><h3>{a}</h3><p>{b}</p><button>مشاهده گزارش <ChevronLeft size={15}/></button></div>)}</div></>}
function Toolbar({placeholder}){return <div className="toolbar"><div className="table-search"><Search size={17}/><input placeholder={placeholder}/></div><button className="btn ghost"><Filter size={16}/> فیلتر</button><button className="btn ghost"><Download size={16}/> خروجی Excel</button></div>}
function TableTop({title,count}){return <div className="card-head table-top"><div><h3>{title}</h3><span>{count}</span></div><button className="link-btn">فیلتر پیشرفته <Filter size={14}/></button></div>}
function Pagination(){return <div className="pagination"><span>نمایش ۱ تا ۵ از ۸۴۲</span><div><button>قبلی</button><button className="current">۱</button><button>۲</button><button>۳</button><button>بعدی</button></div></div>}
function Modal({title,close,children}){return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><div className="modal-head"><h2>{title}</h2><button onClick={close}><X/></button></div>{children}</div></div>}
function InvoiceForm({close}){return <form className="form" onSubmit={e=>{e.preventDefault();close();alert("فاکتور با موفقیت ثبت شد")}}><div className="form-grid"><label>طرف حساب<select required><option>شرکت آریا تجارت</option><option>فروشگاه پارس</option></select></label><label>تاریخ<input type="text" defaultValue="۱۴۰۵/۰۷/۱۵"/></label><label>شماره فاکتور<input defaultValue="INV-1405-00129"/></label><label>شرایط پرداخت<select><option>نقدی</option><option>۳۰ روزه</option><option>۶۰ روزه</option></select></label></div><div className="invoice-line"><b>شرح کالا</b><b>تعداد</b><b>فی</b><b>مبلغ</b></div><div className="invoice-line"><input placeholder="نام کالا یا خدمت"/><input type="number" defaultValue="1"/><input type="number" defaultValue="10000000"/><strong>۱۰,۰۰۰,۰۰۰</strong></div><button type="button" className="add-line"><Plus size={15}/> افزودن ردیف</button><div className="totals"><span>جمع کل <b>۱۰,۰۰۰,۰۰۰ تومان</b></span><span>مالیات و عوارض <b>۱,۰۰۰,۰۰۰ تومان</b></span><strong>قابل پرداخت <b>۱۱,۰۰۰,۰۰۰ تومان</b></strong></div><div className="form-actions"><button type="button" className="btn ghost" onClick={close}>انصراف</button><button className="btn primary"><CheckCircle2 size={17}/> ثبت فاکتور</button></div></form>}
function JournalForm({close}){return <form className="form" onSubmit={e=>{e.preventDefault();close();alert("سند با موفقیت ثبت شد")}}><div className="form-grid"><label>تاریخ<input defaultValue="۱۴۰۵/۰۷/۱۵"/></label><label>شماره سند<input defaultValue="J-000843"/></label></div><label>شرح سند<input required placeholder="شرح عملیات مالی"/></label><div className="journal-entry"><div><b>حساب</b><select><option>بانک ملت - 10102</option><option>حساب‌های دریافتنی - 10301</option></select></div><div><b>بدهکار</b><input type="number" placeholder="0"/></div><div><b>بستانکار</b><input type="number" placeholder="0"/></div></div><div className="journal-entry"><div><b>حساب</b><select><option>فروش کالا - 40101</option><option>صندوق - 10101</option></select></div><div><b>بدهکار</b><input type="number" placeholder="0"/></div><div><b>بستانکار</b><input type="number" placeholder="0"/></div></div><button type="button" className="add-line"><Plus size={15}/> افزودن ردیف سند</button><div className="balance-box"><span>جمع بدهکار <b>۰</b></span><span>جمع بستانکار <b>۰</b></span><strong>سند متوازن است</strong></div><div className="form-actions"><button type="button" className="btn ghost" onClick={close}>انصراف</button><button className="btn primary"><CheckCircle2 size={17}/> ثبت سند قطعی</button></div></form>}

createRoot(document.getElementById("root")).render(<App/>);