package com.csg.warehouse.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 系统启动监听器，用于初始应用根目录
 */
public class StartupListener implements ServletContextListener {
    /**
     * @see ServletContextListener#contextInitialized(ServletContextEvent sce)
     */
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
    }

    /**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent sce)
     */
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
    }
}