package expo.modules.nurapi2

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import com.nordicid.nurapi.BleScanner
import com.nordicid.nurapi.DeviceScannerManager
import com.nordicid.nurapi.NurDeviceSpec
import com.nordicid.nurapi.NurApi
import android.content.Context
import androidx.core.os.bundleOf
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.exception.Exceptions

class ExpoNurApi2Module : Module() {
  private var deviceScannerManager: DeviceScannerManager? = null
  private val nurApi = NurApi()
  val context: Context

  get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoNurApi2')` in JavaScript.
    Name("ExpoNurApi2")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onDeviceFound", "onScanFinished", "onScanError")
    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 11 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(ExpoNurApi2View::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: ExpoNurApi2View, prop: String ->
        println(prop)
      }
    }

    AsyncFunction("startScan") { startScan() }
    AsyncFunction("stopScan") { stopScan() }
    AsyncFunction("getDevicesList") { promise: Promise -> getDevicesList(promise) }
  }

  private fun startScan() {
    if (deviceScannerManager == null) {
      initializeScanner()
    }
    deviceScannerManager?.startScan()
  }

  private fun stopScan() {
    deviceScannerManager?.stopScan()
  }

  private fun getDevicesList(promise: Promise) {
    deviceScannerManager?.let { scanner ->
        val devices = scanner.getDevicesList().map { device ->
            mapOf(
                "name" to device.name,
                "address" to device.address,
                "type" to device.type
            )
        }
        promise.resolve(devices)
    } ?: promise.reject(CodedException("ERROR", "Scanner not initialized", null)) // Pass null as the third parameter
  }
  
  private fun initializeScanner() {
    try {
      // Initialize BleScanner using context
      context?.let {
        BleScanner.init(it)

        // Create the DeviceScannerManager instance
        deviceScannerManager = DeviceScannerManager(it, 7, nurApi, object : DeviceScannerManager.ScanListener {
          override fun onDeviceFound(device: NurDeviceSpec) {
            emitEvent("onDeviceFound", mapOf(
              "name" to device.name,
              "address" to device.address,
              "type" to device.type
            ))
          }

          override fun onScanFinished(deviceList: List<NurDeviceSpec>) {
            val devices = deviceList.map { device ->
              mapOf(
                "name" to device.name,
                "address" to device.address,
                "type" to device.type
              )
            }
            emitEvent("onScanFinished", mapOf("devices" to devices))
          }
        })
      } ?: throw Exception("Context is null")
    } catch (e: Exception) {
      // Send an error event when there's an exception
      emitEvent("onScanError", mapOf("error" to (e.message ?: "Unknown error")))
    }
  }

  private fun emitEvent(eventName: String, params: Map<String, Any>) {
    this@ExpoNurApi2Module.sendEvent(eventName, bundleOf(*params.map { it.key to it.value }.toTypedArray()))
  }
}
