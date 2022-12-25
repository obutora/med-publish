import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class MedHttpHandler {
  static Future<bool> putJson(String jsonString) async {
    final baseUrl = dotenv.env['ENDPOINT'];

    final Uri endpoint = Uri.parse('$baseUrl/medicine/updateAll');

    try {
      final response = await http.post(endpoint, body: {
        'postData': jsonString,
      });

      if (response.statusCode == 201) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw Error();
    }
  }
}
