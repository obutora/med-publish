import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'controller/data_file_handler.dart';
import 'controller/med_http_handler.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ph Client',
      theme: ThemeData(
        primarySwatch: Colors.brown,
      ),
      home: const HomeScreen(),
    );
  }
}

enum PostStatus { success, failed, none }

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  PostStatus postStatus = PostStatus.none;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'POSTAN',
              style: Theme.of(context).textTheme.headline1,
            ),
            const SizedBox(
              height: 12,
            ),
            Text(
              'このアプリケーションは、薬局の在庫している医薬品数データをデータベースに登録するためのものです。',
              style: Theme.of(context).textTheme.caption,
            ),
            const SizedBox(
              height: 40,
            ),
            ElevatedButton.icon(
              label: const Text('CSVを選択して送信'),
              icon: const Icon(CupertinoIcons.cloud_upload_fill),
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 16,
                ),
              ),
              onPressed: () async {
                await DataFileHandler.pickCsvSaveJson();

                final jsonString = await DataFileHandler.readJson();
                final bool isScucessPost =
                    await MedHttpHandler.putJson(jsonString);

                if (isScucessPost) {
                  setState(() {
                    postStatus = PostStatus.success;
                  });
                } else {
                  setState(() {
                    postStatus = PostStatus.failed;
                  });
                }
              },
            ),
            const SizedBox(
              height: 12,
            ),
            Text(
              postStatus == PostStatus.success
                  ? '成功しました！'
                  : postStatus == PostStatus.failed
                      ? '何らかの原因で失敗しました。管理者に問い合わせしてください。'
                      : '',
              style: Theme.of(context).textTheme.caption!.copyWith(
                  color: postStatus == PostStatus.success
                      ? Colors.teal
                      : Colors.orangeAccent),
            )
          ],
        ),
      ),
    );
  }
}
