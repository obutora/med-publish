import 'dart:io';

import 'package:file_picker/file_picker.dart';

class DataFileHandler {
  static Future<void> deleteDataFiles() async {
    try {
      await File('./data/result.csv').delete();
      await File('./data/data.json').delete();
    } catch (e) {
      // throw Error();
      print('ファイルが存在しないため削除できませんでした。');
    }
  }

  //rustでデータを整形してJsonに変換してdata/に保存
  static Future<void> convertCsvToSaveJson() async {
    final currentDir = Directory.current.path;
    // print('currentDir: $currentDir');

    final result = await FilePicker.platform.pickFiles();
    Directory.current = currentDir;

    if (result != null) {
      final path = result.paths[0]!.replaceAll('\\', '/');
      // print(path);

      try {
        await Process.run('./rust/rust-csv-parser.exe', [path],
            workingDirectory: currentDir);
      } catch (e) {
        throw Error();
      }
    }
  }

  // 全処理として以前のデータを削除し、CSVをpickして、
  // 最後にdata/result.sonとして保存する
  static Future pickCsvSaveJson() async {
    await deleteDataFiles();

    try {
      await convertCsvToSaveJson();
    } catch (e) {
      throw Error();
    }
  }

  static Future<String> readJson() async {
    try {
      final file = File('./data/data.json');
      final contents = await file.readAsString();
      return contents;
    } catch (e) {
      throw Error();
    }
  }
}
