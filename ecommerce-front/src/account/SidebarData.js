import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'View website',
    path: '/',
    icon: <AiIcons.AiFillChrome />,
  },
  {
    title: 'Manage Category',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'List Category',
        path: '/admin/categorys',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Category',
        path: '/create/category',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Manage Products',
    icon: <FaIcons.FaCoffee />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'List Products',
          path: '/admin/products',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Add Products',
          path: '/create/product',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        }
      ]
  },
  {
    title: 'View Orders',
    path: '/admin/orders',
    icon: <IoIcons.IoMdPeople />
  }

];