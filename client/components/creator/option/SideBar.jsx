import React from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';


const SideBar = (props) => {

  return (
    <div className='sidemenucontainer' style={{background: '#2c3e50', color: '#FFF', height: '28%'}}>
      <SideNav highlightColor='#eff0f2' highlightBgColor='#7a110d' selected={props.currSelected} onItemSelection={props.changeCb}>
          <Nav id='overview'>
              <NavIcon><img height={25} width={25} src={'https://cdn2.iconfinder.com/data/icons/thin-charts-analytics/24/thin-1078_kpi_dashboard_report-512.png'}/></NavIcon>
              <NavText className='sideNavItem'> Overview </NavText>
          </Nav>
          <Nav id='emotions'>
              <NavIcon><img height={25} width={25} src={'https://cdn3.iconfinder.com/data/icons/stroke/53/28-512.png'}/></NavIcon>
              <NavText className='sideNavItem'> Emotions </NavText>
          </Nav>
          <Nav id='attention'>
              <NavIcon><img height={25} width={25} src={'https://cdn2.iconfinder.com/data/icons/business-224/24/Target-512.png'}/></NavIcon>
              <NavText className='sideNavItem'> Attention </NavText>
          </Nav>
          <Nav id='feedback'>
              <NavIcon><img height={25} width={25} src={'https://d30y9cdsu7xlg0.cloudfront.net/png/204643-200.png'}/></NavIcon>
              <NavText className='sideNavItem'> Feedback </NavText>
          </Nav>
          <Nav id='settings'>
              <NavIcon><img height={25} width={25} src={'https://image.flaticon.com/icons/png/512/32/32441.png'}/></NavIcon>
              <NavText className='sideNavItem'> Settings </NavText>
          </Nav>
          <Nav id='annotations'>
              <NavIcon><img height={25} width={25} src={'https://image.flaticon.com/icons/png/512/32/32441.png'}/></NavIcon>
              <NavText className='sideNavItem'> Annotations </NavText>
          </Nav>
      </SideNav>
    </div>
  )
};

export default SideBar;
