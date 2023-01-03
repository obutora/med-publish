import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

import '../entity/postStatus.dart';

class MedHttpHandler {
  static Future<PostStatus> putJson(String jsonString) async {
    final baseUrl = dotenv.env['ENDPOINT'];

    //envファイルがない場合はエラーを投げる
    if (baseUrl == null) {
      return PostStatus.noEnv;
    } else {
      final Uri endpoint = Uri.parse('$baseUrl/medicine/updateAll');

      try {
        final response = await http.post(endpoint, body: {
          'postData': jsonString,
        });

        if (response.statusCode == 201) {
          return PostStatus.success;
        } else {
          print(response.body);
          return PostStatus.error;
        }
      } catch (e) {
        return PostStatus.failed;
      }
    }
  }

  static Future<String> getStatus() async {
    final baseUrl = dotenv.env['ENDPOINT'];

    //envファイルがない場合はエラーを投げる
    if (baseUrl == null) {
      return 'noEnv';
    } else {
      final Uri endpoint = Uri.parse('$baseUrl/medicine/status');

      try {
        final response = await http.get(endpoint);

        if (response.statusCode == 200) {
          return response.body;
        } else {
          print(response.body);
          return 'failed';
        }
      } catch (e) {
        throw Error();
      }
    }
  }
}
