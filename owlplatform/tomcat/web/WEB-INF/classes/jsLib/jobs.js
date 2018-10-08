//#import Util.js
var JobsApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.jobs,
    Packages.net.xinshi.isone.modules.jobs.impl
);

/**
 * 与定时任务有关的方法
 * @type {{submitTask: submitTask, runNow: runNow, deleteTask: deleteTask}}
 */
var JobsService = {
    /**
     * 提交一个任务
     * @param appId
     * 执行任务的appID
     * @param pageId
     * 执行任务的页面，等到时间一到，这个页面就会被执行
     * @param runParams
     * 页面执行时候的参数，参数会作为全局变量传入页面
     * @param when
     * 以毫秒为单位的时间
     * @returns {*}
     */
    submitTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.taskRunner.submit(task, when);
    },
    /**
     * 立即执行一个任务
     * @param appId
     * @param pageId
     * @param runParams
     * @returns {*}
     */
    runNow: function (appId, pageId, runParams) {
        return JobsService.submitTask(appId, pageId, runParams, (new Date()).getTime());
    },

    /**
     * 删除一个已经提交的任务
     * @param taskId
     * @returns {*}
     */
    deleteTask: function (taskId) {
        return JobsApi.IsoneJobsEngine.taskRunner.deleteTask(taskId);
    },

    getTasks: function (number) {
        var list = JobsApi.IsoneJobsEngine.taskRunner.getTasks(number);
        return $.java2Javascript(list);
    },
    /**
     * 将task加入到执行队列里
     * @param className
     * task类名,JAVA类的全路径,不能为空
     * @param runParams
     * 执行参数
     * @param when
     * 以毫秒为单位的执行时间
     * @returns {*}
     */
    submitJavaTask: function (className, runParams, when) {
        if (!className || className == "")return;
        return JobsApi.IsoneJobsEngine.taskRunner.submitTask(className, runParams, when);
    },
    /**
     * 提交一个商品处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitProductTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.productTaskRunner.submit(task, when);
    },
    /**
     * 提交一个商家处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitMerchantTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.merchantTaskRunner.submit(task, when);
    },
    /**
     * 提交一个会员处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitUserTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.userTaskRunner.submit(task, when);
    },
    /**
     * 提交一个订单处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitOrderTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.orderTaskRunner.submit(task, when);
    },
    /**
     * 提交一个保宏对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitBaohongTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.baohongTaskRunner.submit(task, when);
    },
    /**
     * 提交一个O2O对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitO2OTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.o2oTaskRunner.submit(task, when);
    },
    /**
     * 提交一个ERP对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitErpTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.erpTaskRunner.submit(task, when);
    },
    /**
     * 提交一个数据导出专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitExportTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.exportTaskRunner.submit(task, when);
    },

    /**
     * 提交一个易极付对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitEasyExchangeTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.easyExchangeTaskRunner.submit(task, when);
    },

    /**
     * 提交一个易极付对账专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitEasySettlementTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.easySettlementTaskRunner.submit(task, when);
    },

    /**
     * 提交一个统计任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitStatTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.statTaskRunner.submit(task, when);
    },
    /**
     * 提交一个OMS对接任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitOmsTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.omsTaskRunner.submit(task, when);
    }
};