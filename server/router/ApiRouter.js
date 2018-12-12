const express = require('express')
const apiRouter = express.Router({mergeParams:true});
import {ContentController,AdminController,UserController,MenuController,NewsController,SysLogController} from '../controller'



apiRouter.get('/content', ContentController.getContent);
apiRouter.post('/content', ContentController.createContent);
apiRouter.put('/content/:contentId', ContentController.updateContent);
apiRouter.delete('/content/:contentId', ContentController.removeContent);

apiRouter.get('/admin/:adminId', AdminController.getAdmin);
apiRouter.post('/adminLogin' ,AdminController.adminLogin);
apiRouter.post('/admin' ,AdminController.createAdmin);

apiRouter.get('/user', UserController.getUser);
apiRouter.get('/user/:userId', UserController.getUserBase);
apiRouter.post('/user', UserController.createUser);
apiRouter.post('/userLogin' ,UserController.userLogin);
apiRouter.put('/user/:userId', UserController.updateUser);
apiRouter.put('/user/:userId/password', UserController.changeUserPassword);
apiRouter.put('/user/:userId/status/:status', UserController.updateUserStatus);

apiRouter.get('/menu', MenuController.getMenu);
apiRouter.post('/menu', MenuController.createMenu);
apiRouter.put('/menu/:menuId', MenuController.updateMenu);
apiRouter.delete('/menu/:menuId', MenuController.removeMenu);

apiRouter.get('/news', NewsController.getNews);
apiRouter.post('/menu/:menuId/news', NewsController.createNews);
apiRouter.put('/news/:newsId', NewsController.updateNews);
apiRouter.put('/news/:newsId/image', NewsController.updateNewsImage);
apiRouter.delete('/news/:newsId', NewsController.removeNews);

apiRouter.get('/sysLog', SysLogController.getSysLog);


module.exports = apiRouter
