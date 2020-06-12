package eu.polypoly.pod.android.polyOut

import android.util.Log
import okhttp3.*
import java.io.IOException
import kotlin.coroutines.Continuation
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

private const val TAG = "polyOut"

object PolyOut {
    private val client = OkHttpClient()

    suspend fun fetch(uri: String): String =
        suspendCoroutine { continuation ->
            val request = Request.Builder()
                .url(uri)
                .build()

            client.newCall(request).enqueue(FetchCallback(continuation))
        }
}

private class FetchCallback(private val cont: Continuation<String>) : Callback {
    override fun onFailure(call: Call, e: IOException) {
        Log.e(TAG, "Err, something went wrong: ${e.message}", e)
        cont.resumeWith(Result.failure(e))
    }

    override fun onResponse(call: Call, response: Response) {
        response.use {
            if (!response.isSuccessful) throw IOException("Unexpected code $response")

            for ((name, value) in response.headers) {
                println("$name: $value")
            }

            cont.resume(response.body!!.string())
        }
    }
}
